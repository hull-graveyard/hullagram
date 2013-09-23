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
        order_by: 'created_at DESC'
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


/**
 * ## Upload
 *
 * Thes components allows the user of your applications to attach documents and files to the application.
 *
 * ### Dependencies
 *
 * - `jquery.fileupload`: This plugin uses [jQuery File upload plugin](https://github.com/blueimp/jQuery-File-Upload) to handle the file upload gracefully. Please note that the plugin is packaged within the component so you don't have to struggle against the dependencies.
 * - ` storage`: This plugin requires that you have attahed an S3 storage to your Hull application in the admin.
 *
 * ### Templates
 *
 * - `upload`: The main template. Because the jQuery plugin has some requirements, the template makes sure everything is set up as needed.
 * - `upload_file_multiple`: Partial used to upload multiple files at once. Override this partial to ustomize the file upload to your needs.
 * - `upload_file_single`: Partial used to upload a single file. Override this partial to ustomize the file upload to your needs.
 *
 * ### Options
 *
 * - `storage`: Specifies the storage engine to be used. If a single engine is known to the app, it will be automatically used. If there are many engines available, it must correspond to a value in `sandbox.config.services.types.storage`.
 *
 * ### Events
 *
 * - `hull.upload.send`: Triggered when an upload has started.
 * - `hull.upload.progress`: Triggered when an upload is in progress. The total amount of data as well as the current amount of data transfered are available as a listener parameter.
 * - `hull.upload.done`: Triggered when an upload has finished. References to the uploadded files are available in an Array as the first parameter to the listeners.
 */
Hull.widget('uload', {
  type: 'Hull',

  templates: [ 'upload', 'file_single' ],

  fileTypes: {
    images :  /(\.|\/)(gif|jpe?g|png)$/i,
    videos :  /(\.|\/)(mov|mkv|mpg|wmv|mp4|m4v)$/i
  },

  fileProcessors: {
    images: [
      { action: 'load', fileTypes: /^image\/(gif|jpeg|png)$/, maxFileSize: 20000000 },
      { action: 'resize', maxWidth: 1440, maxHeight: 900 },
      { action: 'save' }
    ]
  },

  uploader_events: [
    'fileuploadadd',
    'fileuploadadded',
    'fileuploadalways',
    'fileuploadchange',
    'fileuploadcompleted',
    'fileuploaddestroy',
    'fileuploaddestroyed',
    'fileuploaddone',
    'fileuploaddragover',
    'fileuploaddrop',
    'fileuploadfail',
    'fileuploadfailed',
    'fileuploadfinished',
    'fileuploadpaste',
    'fileuploadprogress',
    'fileuploadprogressall',
    'fileuploadsend',
    'fileuploadsent',
    'fileuploadstart',
    'fileuploadstarted',
    'fileuploadstop',
    'fileuploadstopped',
    'fileuploadsubmit'
  ],

  uploader_options: {
    autoUpload : true,
    maxNumberOfFiles:1,
    maxFileSize: 5000000,
    minFileSize:0,
    dropZone: '.dropzone',
    type : 'POST'
    // previewSourceMaxFileSize: 5000000
    // previewMaxWidth: 80
    // previewMaxHeight: 80
  },

  selectStoragePolicy: function () {
    var storagePolicies = [],
        selectedPolicy,
        optionValue = this.options.storage;
    if (this.sandbox.config.services.types.storage) {
      storagePolicies = this.sandbox.config.services.types.storage;
    }
    var countPolicies = storagePolicies.length;
    if (countPolicies === 1) {
      selectedPolicy = storagePolicies[0];
    } else if (countPolicies > 1) {
      if (!optionValue) {
        throw new TypeError('You must specify a storage policy.');
      }
      if (storagePolicies.hasOwnProperty(optionValue)) {
        selectedPolicy = storagePolicies[optionValue];
      } else {
        throw new TypeError('Unknown storage policy: ', optionValue);
      }
    } else {
      console.warn('No storage policy declared for the app. Unable to save the pictures.');
    }

    return this.sandbox.config.services.settings[selectedPolicy];
  },

  beforeRender: function (data) {
    data.upload_policy = this.selectStoragePolicy();
    return data;
  },

  afterRender: function () {
    this.form = this.$el.find('form');
    var opts = this.sandbox.util._.defaults(this.uploader_options, {
      dataType:         'xml',
      url:              this.form.attr('action'),
      dropZone:         this.$el.find(this.uploader_options.dropZone),
      acceptFileTypes:  this.fileTypes.images
    });

    this.form.fileupload(opts);
    this.uploader = this.form.data('fileupload');
    this.dropzone = this.$el.find(this.uploader_options.dropZone);

    var emit = this.sandbox.emit, form = this.form;

    this.sandbox.util._.each(this.uploader_events, function(evt) {
      var n = evt.replace(/^fileupload/, '');
      form.on(evt, function(e,d) { emit('hull.upload.' + n, { event: e, data: d }); });
    });

    this.form.on('fileuploadadd',       this.onAdd);
    this.form.on('fileuploaddragover',  this.onDragOver);
    this.form.on('fileuploaddrop',      this.onDrop);
    this.form.on('fileuploadsend',      this.onSend);
    this.form.on('fileuploadsubmit',    this.onSubmit);
    this.form.on('fileuploadprogress',  this.onProgress);
    this.form.on('fileuploadfail',      this.onFail);
    this.form.on('fileuploadsuccess',   this.onSuccess);
    this.form.on('fileuploaddone',      this.onDone);

  },

  start: function () {
    this.form.fileupload('send', this.upload_data);
  },

  cancel: function () {},

  delete: function () {},

  onDrop: function () {
    this.dropzone.find('b').text('Thanks !');
    this.dropzone.removeClass('dropzone');
  },

  onDragOver: function () {
    this.dropzone.addClass('dragover');
    clearTimeout(this.dragOverEffect);
    var self = this;
    this.dragOverEffect = setTimeout(function () { self.dropzone.removeClass('dragover'); }, 100);
  },

  onAdd: function (e, data) {
    var key = this.$el.find('[name="key"]');
    var s = key.val();
    key.val(s.replace('${filename}', "/" + data.files[0].name));
    this.$el.find('[name="Filename"]').val(data.files[0].name);
    this.$el.find('[name="name"]').val(data.files[0].name);
    this.$el.find('[name="Content-Type"]').val(data.files[0].type);
    return this.upload_data = data;
  },

  onSend: function (e, data) {
    this.$el.find('.progress').fadeIn();
  },

  onSubmit: function (e, data) {
    this.toggleDescription();
  },

  toggleDescription: function () {
    var descriptionElt = this.$el.find('[name=description]');
    if (descriptionElt.is(':disabled')) {
      descriptionElt.removeAttr('disabled');
      descriptionElt.val('');
    } else {
      this.description = descriptionElt.val() || undefined;
      this.$el.find('[name=description]').attr('disabled', 'disabled');
    }
  },

  onProgress: function (e, data) {
    this.$el.find('.bar').css('width', data.percent + '%');
  },

  onFail: function (e, data) {
    this.$el.find('.error').text('Error :#{data.errorThrown}');
  },

  onDone: function (e, data) {
    this.$el.find('.progress').fadeOut(300, function () {});
    this.$el.find('.bar').css('width', 0);
    this.onUploadDone(data);
  },

  onUploadDone: function (data) {
    // var location = $(data.result).find('Location').text();
    // Context.app.addImage(filename: data.files[0].name)
    this.sandbox.util._.map(data.files, this.sandbox.util._.bind(function (file) {
      file.url = this.fileUrl(file.name);
      file.description = this.description;
    }, this));
    this.toggleDescription();
    this.uploader.options.maxNumberOfFiles++;
  },

  multipleUpload: function () {
    return false;
    // return (this.uploader.options.maxNumberOfFiles > 1);
  },

  fileUrl: function (filename) {
    var policy = this.selectStoragePolicy();
    return encodeURI(policy.url + policy.params.key.replace('${filename}', '/' + filename));
  },

  initialize: function () {
    var _ = this.sandbox.util._;
    _.bindAll.apply(undefined, [this].concat(_.functions(this)));
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
