Hull.widget('friends_list', {
  templates: ['friends_list', 'friend'],
  datasources: {
    friends: "me/friends"
  },
  beforeRender: function (data) {
    var deferred = this.sandbox.data.deferred();
    var promise = this.countFriendsPictures(data.friends);
    promise.then(function () {
      deferred.resolve(data);
    });
    return deferred;
  },

  countFriendsPictures: function (friends) {
    var promises = [];
    friends.forEach(function (item) {
      var dfd = this.api.get(item.id + "/images")
        .then (function (images) {
          item.images = images;
        });
      promises.push(dfd);
    }.bind(this));
    return this.sandbox.data.when.apply(undefined, promises)
  },

  actions: {
    viewFriend: function (elt, evt, data) {
      evt.stopPropagation();
      var friendId = data.friend_id;
      var friend = this.datasources.friends.filter(function (friend) {
        return friend.get('id') === friendId;
      });
      this.render("friend", {friends: friend});
    }
  }
});
