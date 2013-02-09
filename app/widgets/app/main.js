/*global Hull:true, _:true, Backbone:true, app:true */
Hull.widget('app', {
  templates: ["feed","share","comment","picture","likes", "new_picture", "friends", "profile"],

  initialize: function () {
    "use strict";
    this.initRouter();
  },

  initRouter: function () {
    var HullagramRouter = Backbone.Router.extend({
      routes: {
        'feed': 'feed',
        'likes': 'likes',
        'camera' : 'camera',
        'friends': 'friends',
        'profile': 'profile',
        'profile/:id': 'profile',
        'comments/:id': 'comments',
        "picture/:id": "picture",
        "share/:id": "share"
      }
    });

    app.router = new HullagramRouter();
    app.router.on('route:feed', function () {
      this.render('feed');
    }.bind(this));

    app.router.on('route:likes', function () {
      this.render('likes');
    }.bind(this));

    app.router.on('route:picture', function (id) {
      this.render('picture', {id: id});
    }.bind(this));

    app.router.on('route:share', function (id) {
      this.render('share', {id: id});
    }.bind(this));

    app.router.on('route:camera', function (data) {
      this.render('new_picture', data);
    }.bind(this));

    app.router.on('route:friends', function () {
      this.render('friends');
    }.bind(this));

    app.router.on('route:comments', function (id) {
      this.render('comment', {id: id});
    }.bind(this));

    app.router.on('route:profile', function (id) {
      this.render('profile', {id: id || 'me'});
    }.bind(this));

  }
});

