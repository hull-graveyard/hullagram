/*global Hull:true, _:true, Backbone:true, app:true */
Hull.widget('app', {
  templates: ["pictures", "share", "comments", "likes", "new_picture", "friends", "users", "profile", "nav"],

  initialize: function () {

    this.initRouter();

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
      this.render(tpl, { id: id });
    }, this));

    this.sandbox.on('hullagram.route', function(route) {
      router.navigate(route, { trigger: true });
    });

  },

  beforeRender: function(data) {
    data.currentView = this.currentView;
    return data;
  },

  afterRender: function() {
    var tab = this.$el.find("li.tab-item." + this.currentView);
    tab.addClass("active");
  }
});

