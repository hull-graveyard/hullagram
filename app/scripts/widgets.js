// This widget acts as the main app controller
// It handles route updates via a Backbone Router
// and displays a specific template for each route.
//
// The content of the different views are delegated to other widgets
// that handle the fetching of their data...
// We don't handle any data fetching here.
//
// Also notice that we are using some templates as Handlebars partials here :
// the 'nav' template is included in all other templates to
// display the bar-tab at the bottom of the app


Hull.widget('app', {
  templates: [
    // '/pictures' and '/pictures/:picture_id'
    "pictures",
    // '/likes'
    "likes",
    // '/pictures/:picture_id/share' (NOT FULLY FUNCTIONAL YET...)
    "share",
    // '/pictures/:picture_id/comments'
    "comments",
    // displayed when a new picture has been uploaded
    "new_picture",
    // '/friends'
    "friends",
    // '/users/:user_id'
    "users",
    // '/profile'
    "profile",
    // nav is a partial that is displayed in all views
    "nav"
  ],

  initialize: function () {
    this.initRouter();

    // Event triggered by the 'uploader' widget whenever a new picture
    // has been uploaded by the user
    this.sandbox.on('hullagram.newPicture', function(pic) {
      this.render('new_picture', pic);
    }, this);
    return false;
  },

  initRouter: function() {
    var Backbone = Hull.require('backbone'),
        _        = Hull.require('underscore');


    var HullagramRouter = Backbone.Router.extend({
      initialize: function() {
        this.routesHit = 0;
        //keep count of number of routes handled by your application
        Backbone.history.on('route', function() { this.routesHit++; }, this);
      },
      routes: {
        ':view(/:id)(/:action)' : 'view'
      },
      back: function() {
        console.warn("RoutesHit");
        if(this.routesHit > 1) {
          //more than one route hit -> user did not land to current page directly
          window.history.back();
        } else {
          //otherwise go to the home page. Use replaceState if available so
          //the navigation doesn't create an extra history entry
          this.navigate('/pictures', { trigger:true, replace:true });
        }
      }
    });

    var router  = new HullagramRouter();

    router.on('route:view', function(view, id, action) {
      var tpl = action || view || 'pictures';
      if (!_.include(this.templates, tpl)) {
        tpl = 'pictures';
      }
      this.currentView = tpl;

      // Actual re-rendering of the widget with
      // the template that corresponds to the currentView
      this.render(tpl, { id: id });
    }, this);

    // Allows other widget to emit events that trigger
    // the navigation to another view
    this.sandbox.on('hullagram.route', function(route) {
      router.navigate(route, { trigger: true });
    });

    this.sandbox.on('hullagram.back', function() {
      router.back();
    });

    setTimeout(function() {
      Backbone.history.start();
    }, 200);
  },

  actions: {
    back: function() {
      this.sandbox.emit('hullagram.back');
    }
  },

  beforeRender: function(data) {
    // Make the currentView name available to
    // the templates data context
    data.currentView = this.currentView;
    return data;
  },

  afterRender: function() {
    // Once the template has been refreshed, we
    // highlight the correct tab-item on the tab-bar
    // based on the currentView
    var tab = this.$el.find("li.tab-item." + this.currentView);
    tab.addClass("active");
  }
});





//--------


/*global Hull:true */
Hull.widget('comment', {
  templates: ['main'],

  // This widget is just a wrapper for the comments@hull widget
  // to also fetch the list of user who like the picture
  datasources: {
    likes: ':id/likes'
  },

  actions: {
    back: function() {
      this.sandbox.emit('hullagram.back');
    }
  },

  beforeRender: function(data) {
    data.picture_id = this.options.id;
  }
});




//--------


Hull.component('follow_user', {

  templates: ['main'],

  datasources: {
    following: function() {
      if (this.id) {
        return this.api("following/" + this.id);
      }
    },
    user: ":id"
  },

  beforeRender: function(data) {
    this.isFollowing = data.following;
  },

  actions: {
    toggleFollow: function() {
      var self = this, verb = "put";
      if (this.isFollowing) {
        verb = "delete";
      }
      this.api("following/" + this.id, verb).then(function() {
        self.render();
      })
    }
  }
});



//--------


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




//--------


// This Widget is the main entry point for the app
// It handles the rendering of the whole app
// depending on the login status of the user
// If the user is already logged in it renders the widget called 'app'
// otherwise, it renders a login screen

Hull.widget('hullagram', {
  templates: ["main"],
  // Refresh (re-render) all on model.hull.me.change events
  // which are emitted whenever the user login status changes
  refreshEvents: ['model.hull.me.change']
});




//--------


/*global Hull:true */

Hull.widget('likes', {
  templates: ['main'],

  datasources: {
    // Fetch the current user likes limit the results to the latest 100 pictures
    // liked
    likes: function() {
      return this.api('me/liked', {
        order_by: 'created_at ASC',
        limit: 100
      });
    }
  },

  beforeRender: function(data) {
    var _ = this.sandbox.util._;

    // the Likes api returns the liked objects wrapped in the 'liked' key
    // cf. http://alpha.hull.io/docs/api/likes
    data.pictures = _.filter(_.pluck(data.likes, 'liked'), function(l) {
      return l && l.type === 'image';
    });
  }
});




//--------


Hull.widget('new_picture', {
  templates: ['main'],

  beforeRender: function (data) {
    data.source_url = this.options.source_url;
    data.blob = this.options.blob;
  },

  actions: {
    send: function (event, options) {
      $(options.el).addClass('disabled-state');
      var textarea = document.getElementById('picture-description');

      this.sandbox.emit('hullagram.savingPicture');

      this.api.post('/me/images', {
        description: textarea.value,
        source_url: this.options.source_url,
        name: this.options.name
      }).then(function (image) {
        this.sandbox.emit('hullagram.pictureSaved', image);
      }.bind(this));
    }
  }
});




//--------


// This widget displays a list of images fetched from
// the public activity feed of the app.

Hull.widget('pictures', {
  templates: ['main', 'picture', 'likes'],
  datasources: {
    activity: function() {

      // All pictures displayed in the app are fetched from the apps' activity feed.
      // this datasource builds a query to fetch all the "create Image" entries
      // and allows to filter either :
      // - by actor_id to get all the images created by a specific user
      // - by obj_id : to get a single image
      // - or to get the latest public images on the feed

      var where = { obj_type: 'Image', verb: 'create' };

      // Filter by actor_id to get the latest pictures of a user
      // this.options.userId come from a data attribute passed to the widget like this:
      // <div data-hull-widget='pictures' data-hull-user-id='xxxxxxxxx'>
      if (this.options.userId) {
        where.actor_id = this.options.userId;
      }

      // Filter by obj_id to get a single picture
      // this.options.id come from a data attribute passed to the widget like this:
      // <div data-hull-widget='pictures' data-hull-id='xxxxxxxxx'>
      if (this.options.id) {
        where.obj_id = this.options.id;
      }

      return this.api('app/activity', {
        limit: 10,
        where: where,
        order_by: 'created_at DESC',
        page: (this.options.page || 1)
      });
    },

    likes: function() {
      // If we display a single picture, we also get the list of Users who liked it
      if (this.options.id) {
        return this.api(this.options.id + '/likes');
      }
    }
  },

  actions: {
    back: function() {
      this.sandbox.emit('hullagram.back');
    },
    more: function() {
      this.options.page = (this.options.page || 1) + 1
      this.render();
    }
  },

  beforeRender: function (data) {
    if (this.options.id) {
      data.single_picture_id = this.options.id;
    }

    // The activity datasource returns a list of activities (cf. http://alpha.hull.io/docs/api/activities)
    // Here we are only interested in the 'object' inside the activity, which is the Image Object (cf. http://alpha.hull.io/docs/api/resources)
    var pictures = this.sandbox.util._.pluck(data.activity, 'object');
    // It occured that some activities may be attached to a null object...
    data.pictures = this.sandbox.util._.filter(pictures, function (p) {
      return p;
    });
  }
});




//--------


Hull.widget('profile', {
  templates: ['main'],

  datasources: {
    // We fetch a specific user via its id
    user: ':id',
    // And its friends...
    friends:  ':id/friends'
  },

  initialize: function() {
    // If no id is specified, we display the current user's profile
    this.options.id = this.options.id || 'me';
  },

  beforeRender: function (data) {
    // Is it me ?
    data.isMe = data.user.id === data.me.id;
    data.user.stats.images = data.user.stats.images || '0';
    data.user.stats.liked = data.user.stats.liked || '0';
  }
});





//--------


/*global Hull:true */

Hull.widget('share', {
  templates: ['main'],

  datasources: {
    picture: ':id'
  },

  actions: {
    back: function() {
      this.sandbox.emit('hullagram.back');
    },

    share: function (event, options) {
      var textarea = document.getElementById('share-description');
      var description = textarea.value;
      var params = window.location.protocol + options.data.sourceUrl + '&text=' + description + '&via=hull';
      var url = 'https://twitter.com/share?url=' + params;

      window.open(url);
    }
  }
});




//--------


// All the heavylifting for pictures upload
// is handled by the widget upload@hull
// Here we attach event handlers on the different steps of the upload process
//
// This widget is only used to display overlayed notifications...

Hull.widget('uploader', {

  templates: ['uploader'],

  initialize: function() {
    // Events emitted by the 'upload@hull' widget.
    this.sandbox.on('hull.upload.send', this.onUploadSend, this);
    this.sandbox.on('hull.upload.done', this.onUploadDone, this);
    this.sandbox.on('hull.upload.progressall', this.onUploadProgress, this);

    // Events emitted by the 'new_picture' widget.
    this.sandbox.on('hullagram.pictureSaved', this.onPictureSaved, this);
    this.sandbox.on('hullagram.savingPicture', this.onSavingPicture, this);
  },

  afterRender: function() {
    // Just to have a handle on the notification element...
    this.$notification = this.$el.find('.notification');
  },

  onUploadSend: function() {
    // Display a message during the upload
    this.$notification
      .attr('class', 'notification active fadeIn')
      .find('i').attr('class', 'icon-spinner icon-spin').end()
      .find('p').text('Uploading');
  },

  onPictureSaved: function(picture) {
    this.$notification
      .attr('class', 'notification active fadeOut animation-delay-long')
      .one('animationend webkitAnimationEnd', function(){
        // app.router.trigger('route:picture', picture.id);
        this.sandbox.emit('hullagram.route', '/pictures/' + picture.id);
      }.bind(this))
      .find('i').attr('class', 'icon-cloud-upload').end()
      .find('p').text('Sent');
  },

  onSavingPicture: function() {
    this.$notification
        .attr('class', 'notification active fadeIn')
        .find('i').attr('class', 'icon-spinner icon-spin').end()
        .find('p').text('Sending');
  },

  onUploadProgress: function(e) {
    var percent = Math.round(100 * e.data.loaded / e.data.total);
    this.$notification.find('p').text('Uploading (' + percent + '%)');
  },

  onUploadDone: function (e) {
    var files = e.data.files;
    // We use the FileReader API to display
    // the uploaded image... saves some bandwith ;-)
    // We could apply instagram style filters here if we were more brave...
    var file = files[0];
    if (file.type && file.type.split("/")[0] === "image") {
      // Create the thumbnail/preview
      var img = document.createElement("img"),
          reader = new FileReader(),
          self = this;
      reader.onload = function(e) {
        // Hide the notification message
        self.$notification
          .attr('class', 'notification active fadeOut animation-delay')
          .one('animationend webkitAnimationEnd', function() {
            // All right, the file uploaded is a picture and we were able to
            // preview it...
            // delegate the rest to someone else.
            self.sandbox.emit('hullagram.newPicture', {
              source_url: file.url,
              name: file.name,
              blob: e.target.result // Thumbnail
            });

          })
          .find('i').attr('class', 'icon-spinner icon-spin').end()
          .find('p').text('Uploading');
      };
      reader.readAsDataURL(file);
    }
  }

});
