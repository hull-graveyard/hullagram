Hull.component('follow_user', {

  templates: ['main'],

  datasources: {
    following: function() {
      if (this.id) {
        return this.api("following/" + this.id);
      }
    },
    user: ":id"
  },

  beforeRender: function(data) {
    this.isFollowing = data.following;
  },

  actions: {
    toggleFollow: function() {
      var self = this, verb = "put";
      if (this.isFollowing) {
        verb = "delete";
      }
      this.api("following/" + this.id, verb).then(function() {
        self.render();
      })
    }
  }
});