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

