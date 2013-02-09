Hull.widget('friends_list', {
  templates: ['friends_list', 'friend'],
  datasources: {
    friends: "me/friends"
  },

  actions: {
    backToFriendsList: function (elt, evt, data) {
      evt.stopPropagation();
      this.render('friends_list');
    }
  }
});
