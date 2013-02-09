/*global Hull:true */
Hull.widget('profile', {

  templates: ['main'],

  datasources: {
    user:     ':id',
    friends:  ':id/friends',
    pictures: ':id/images',
    likes:    ':id/liked'
  },

  beforeRender: function (data) {
    data.isMe = data.user.id === data.me.id;
  },

  actions: {
    route: function (elt, evt, data) {
      this.sandbox.emit("hullagram.route", data.route, data);
    }
  }
});

