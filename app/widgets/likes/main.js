/*global Hull:true _:true */
Hull.widget('likes', {

  templates: ['main'],

  datasources: {
    // Fetch the current user likes
    // limit the results to the latest 100
    // pictures liked
    likes: function() {
      return this.api('me/liked', {
        order_by: 'created_at ASC',
        limit: 100
      });
    }
  },

  beforeRender: function(data) {
    // the Likes api returns the liked objects wrapped in the 'liked' key
    // cf. http://alpha.hull.io/docs/api/likes
    data.pictures = _.filter(_.pluck(data.likes, 'liked'), function(l) {
      return l && l.type === 'image';
    });
    // data.pictures = _.reverse(data.pictures)
    return data;
  }

});
