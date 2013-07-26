/**
 *
 * ## friends list
 *
 * Displays friends for a given user and a given service.
 *
 * ### Example
 *
 *     <div data-hull-widget="friends@hull"></div>
 *
 * ### Options
 *
 * - `id`: Optional, the id of the user whose friends we want to list. By default, it will list the friends of the current user.
 * - `provider`: Optional, service from which we will fetch friends. Can be `hull`, `instagram`, `twitter`, `facebook` or `github`, by default it will list friends from `hull`.
 *   `hull` will show the user's friends who have used the app.
 * - `limit`: Optional, the number of friends to display. Be default it will display 10 friends.
 * - `scope` : Optional, a Facebook permission you need to ask the user before being able to show data. - If this permission is not given, a button will be shown to ask for it.
 *
 * ### Template
 *
 * - `friends`: Displays the list of the user's friends.
 *
 * ### Actions
 *
 * - `authorize`: Pops up a permissions dialog or a login dialog.
 *
 * ### Datasource
 *
 * - `friends`: The user's friends.
 * - `authorized` : A hash of permissions showing if the user can view the images.
 * Contains `provider`, `permissions` : Booleans showing if the provider and permissions are right,
 * and `provider_name` containing the name of the asked provider
 *
 */

Hull.widget("friends", {
  type: 'Hull',

  templates: [
    'friends'
  ],

  options: {
    id:'me',
    provider:'hull',
    limit: 10,
    scope: ''
  },

  refreshEvents: ['model.hull.me.change'],

  initialize: function() {
    this.me = this.api.model('me');

    this.provider = this.options.provider;
  },

  getUserId: function () {
    return this.options.id || 'me';
  },

  actions: {
    authorize: function(){
      if(this.provider==="facebook"){
        this.sandbox.login('facebook', {scope:this.options.scope}).then(this.sandbox.util._.bind(function(){
          this.render();
        },this));
      } else {
        this.sandbox.login(this.provider,{}).then(this.sandbox.util._.bind(function(){
        },this));
      }
    }
  },

  datasources: {
    authorized: function() {
      return this.isAuthorized(this.provider);
    },

    friends: function() {

      var deferred = this.sandbox.data.deferred();
      var self = this;

      // map identities by name
      var identities = this.sandbox.util._.reduce(this.me.get('identities'), function(m, i) {
        m[i.provider] = i;
        return m;
      }, {});

      //Are we logged in to provider, or is provider hull. if Provider is hull, are we asking "me" without being loggedin ?
      if( this.loggedIn()[this.provider] || (this.provider==="hull" && (this.loggedIn() || this.getUserId()!=="me"))){
        this.request(this.provider, identities, this.options).then(this.sandbox.util._.bind(function(res) {

          var serialized = this.sandbox.util._.bind(this.serializers[self.provider],this,res,this.options);
          var friends = serialized().slice(0, this.options.limit);
          deferred.resolve(friends);

        }, this));
      } else{
        deferred.resolve([]);
      }

      return deferred.promise();
    }
  },

  isAuthorized: function(provider){
    var deferred = this.sandbox.data.deferred();
    var self = this;
    var auth = {
      provider_name: provider,
      provider:false,
      permissions:false
    };

    if(provider==="hull"){
      auth.permissions = true;

      var valid = (this.loggedIn() || this.getUserId()!=="me");
      auth.provider = valid;

      var authProviders = this.sandbox.config.services.types.auth;
      if (!authProviders || !authProviders.length) {
        deferred.reject(new Error('No auth provider for this app'));
      } else {
        auth.provider_name = authProviders[0].replace(/_app$/,'');
        deferred.resolve(auth);
      }

      deferred.resolve(auth);
    } else {
      if (this.loggedIn()[provider]){
        auth.provider=true;
        if(provider==='facebook'){
          this.hasFacebookPermissions(self.options.scope, auth, deferred);
        } else {
          auth.permissions=true;
          deferred.resolve(auth);
        }
      } else {
        auth.provider=false;
        deferred.resolve(auth);
      }

    }


    return deferred.promise();
  },

  hasFacebookPermissions: function(scope, authorization, deferred){
    var sandbox = this.sandbox;
    if(!scope){
      authorization.permissions=true;
      deferred.resolve(authorization);
    } else {
      this.api({provider: 'facebook', path:"me/permissions"}).then(function(res) {

        //Convert scope to array if given as a string.
        if(this.sandbox.util._.isString(scope)){
          scope = scope.replace(' ','').split(',');
        }

        if(this.sandbox.util._.isArray(scope) && (this.sandbox.util._.intersection(this.sandbox.util._.keys(res.data[0]), scope).length==scope.length)){
          //we have all the perms we need.
          authorization.permissions=true;
        }

        deferred.resolve(authorization);
      });
    }
  },



  request: function(provider, identities, options) {
    var path, params;

    switch (provider) {
      case 'hull':
        path = this.getUserId() + '/friends';
        params = { per_page: this.options.limit };
        break;
      case 'facebook':
        path = {provider: 'facebook', path: this.getUserId() + '/friends'};
        params = { limit: this.options.limit };
        break;
      case 'twitter':
        path = {provider:'twitter', path: 'friends/list'};
        params = { user_id: ((this.getUserId()==='me')?identities.twitter.uid:this.getUserId()) };
        break;
      case 'instagram':
        path = {provider:'instagram', path:'users/'+((this.getUserId()==='me')?'self':this.getUserId())+'/follows'};
        params = { per_page: this.options.limit };
        break;
      case 'github':
        path = {provider: 'github', path: 'users/' + ((this.getUserId()==='me')?identities.github.login:this.getUserId()) + '/following'};
        params = { per_page: this.options.limit };
        break;
    }

    return this.api(path, params);
  },

  serializers: {
    hull: function(res) {
      return this.sandbox.util._.map(res, function(f) {
        return {
          provider: 'hull',
          name: f.name,
          avatar: f.picture,
          created_at: f.created_at,
          stats: f.stats,
          uid: f.id
        };
      });
    },

    facebook: function(res) {
      return this.sandbox.util._.map(res.data, function(f) {
        return {
          provider: 'facebook',
          name: f.name,
          avatar: 'http://graph.facebook.com/' + f.id + '/picture',
          uid: f.id
        };
      });
    },

    twitter: function(res) {
      return this.sandbox.util._.map(res.users, function(f) {
        return {
          provider: 'twitter',
          name: f.name,
          avatar: f.profile_image_url,
          uid: f.id
        };
      });
    },

    instagram: function(res){
      return this.sandbox.util._.map(res, function(f){
        return {
          provider: 'instagram',
          name: f.full_name,
          avatar: f.profile_picture,
          uid: f.id
        };
      });
    },

    github: function(res) {
      return this.sandbox.util._.map(res, function(f) {
        return {
          provider: 'github',
          name: f.login,
          avatar: f.avatar_url,
          id: f.id
        };
      });
    }
  }
});
