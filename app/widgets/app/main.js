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

