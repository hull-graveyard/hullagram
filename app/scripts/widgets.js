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
    this.sandbox.on('hullagram.newPicture', _.bind(function(pic) {
      this.render('new_picture', pic);
    }, this));

  },

  initRouter: function() {
    var HullagramRouter = Backbone.Router.extend({
      routes: {
        ':view(/:id)(/:action)' : 'view'
      }
    });

    var router = new HullagramRouter();

    router.on('route:view', _.bind(function(view, id, action) {
      var tpl = action || view || 'pictures';
      if (!_.include(this.templates, tpl)) {
        tpl = 'pictures';
      }
      this.currentView = tpl;

      // Actual re-rendering of the widget with
      // the template that corresponds to the currentView
      this.render(tpl, { id: id });
    }, this));

    // Allows other widget to emit events that trigger
    // the navigation to another view
    this.sandbox.on('hullagram.route', function(route) {
      router.navigate(route, { trigger: true });
    });

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

  beforeRender: function(data) {
    data.picture_id = this.options.id;
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


/*global Hull:true _:true */
Hull.widget('likes', {

  templates: ['main'],

  datasources: {
    // Fetch the current user likes
    // limit the results to the latest 100
    // pictures liked
    likes: function() {
      return this.api('hull/me/liked', {
        order_by: 'created_at DESC',
        limit: 100
      });
    }
  },

  beforeRender: function(data) {
    // the Likes api returns the liked objects wrapped in the 'liked' key
    // cf. http://alpha.hull.io/docs/api/likes
    data.pictures = _.filter(_.pluck(data.likes, 'liked'), function(l) {
      return l.type === 'image';
    });
    return data;
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
    send: function (elt, evt, data) {
      elt.addClass('disabled-state');
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
      // this.options.user_id come from a data attribute passed to the widget like this:
      // <div data-hull-widget='pictures' data-hull-user-id='xxxxxxxxx'>
      if (this.options.user_id) {
        where.actor_id = this.options.user_id;
      }

      // Filter by obj_id to get a single picture
      // this.options.id come from a data attribute passed to the widget like this:
      // <div data-hull-widget='pictures' data-hull-id='xxxxxxxxx'>
      if (this.options.id) {
        where.obj_id = this.options.id;
      }

      return this.api('hull/app/activity', {
        limit: 10,
        where: where,
        order_by: 'created_at DESC'
      });
    },

    likes: function() {
      // If we display a single picture, we also get the list of Users who liked it
      if (this.options.id) {
        return this.api('hull/' + this.options.id + '/likes');
      }
    }
  },

  beforeRender: function (data) {
    if (this.options.id) {
      data.single_picture_id = this.options.id;
    }

    // The activity datasource returns a list of activities (cf. http://alpha.hull.io/docs/api/activities)
    // Here we are only interested in the 'object' inside the activity, which is the Image Object (cf. http://alpha.hull.io/docs/api/resources)
    data.pictures = _.pluck(data.activity, 'object');
  }
});





//--------


Hull.widget('profile', {

  templates: ['main'],

  datasources: {
    // We fetch a specific user via its id
    user:     ':id',
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
  }

});





//--------


/*global Hull:true */
Hull.widget('share', {
  templates: ['main'],
  datasources: {
    pictures: ':id'
  },

  beforeRender: function(data) {
    console.warn("Share Data", data);
  },

  actions: {
    share: function (elt, evt, data) {
      // Temporary
      var textarea = document.getElementById('share-description'),
          description = textarea.value,
          params = window.location.protocol+data.source_url+'&text='+description+'&via=hull',
          url = 'https://twitter.com/share?url='+params;
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
    this.sandbox.on('hull.upload.send',         _.bind(this.onUploadSend, this));
    this.sandbox.on('hull.upload.done',         _.bind(this.onUploadDone, this));
    this.sandbox.on('hull.upload.progressall',  _.bind(this.onUploadProgress, this));

    // Events emitted by the 'new_picture' widget.
    this.sandbox.on('hullagram.pictureSaved', _.bind(this.onPictureSaved, this));
    this.sandbox.on('hullagram.savingPicture', _.bind(this.onSavingPicture, this));
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
      var img = document.createElement("img");
      var reader = new FileReader();
      reader.onload = _.bind(function(e) {
        // Hide the notification message
        this.$notification
          .attr('class', 'notification active fadeOut animation-delay')
          .one('animationend webkitAnimationEnd', function() {
            // All right, the file uploaded is a picture and we were able to
            // preview it...
            // delegate the rest to someone else.
            this.sandbox.emit('hullagram.newPicture', {
              source_url: file.url,
              name: file.name,
              blob: e.target.result // Thumbnail
            });

          }.bind(this))
          .find('i').attr('class', 'icon-spinner icon-spin').end()
          .find('p').text('Uploading');

      }, this);
      reader.readAsDataURL(file);
    }
  }

});
