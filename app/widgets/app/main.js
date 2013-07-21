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
    return false;
  },

  initRouter: function() {

    var HullagramRouter = Backbone.Router.extend({
      routes: {
        ':view(/:id)(/:action)' : 'view'
      }
    });

    var router = new HullagramRouter();

    router.on('route:view', _.bind(function(view, id, action) {
      console.log('route_view', arguments)
      var tpl = action || view || 'pictures';
      if (!_.include(this.templates, tpl)) {
        tpl = 'pictures';
      }
      this.currentView = tpl;
      console.log('Router', tpl)

      // Actual re-rendering of the widget with
      // the template that corresponds to the currentView
      this.render(tpl, { id: id });
    }, this));

    // Allows other widget to emit events that trigger
    // the navigation to another view
    this.sandbox.on('hullagram.route', function(route) {
      router.navigate(route, { trigger: true });
    });

    Backbone.history.start();
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

