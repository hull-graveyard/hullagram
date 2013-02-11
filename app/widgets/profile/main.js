/*global Hull:true */
Hull.widget('profile', {

  templates: ['main'],

  datasources: {
    user:     ':id',
    friends:  ':id/friends'
  },

  initialize: function() {
    this.options.id = this.options.id || 'me';
  },

  beforeRender: function (data) {
    data.isMe = data.user.id === data.me.id;
  }

});

