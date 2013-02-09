/*global Hull:true _:true */
Hull.widget('likes', {

  templates: ['main'],

  datasources: {
    likes: function() {
      return this.api('hull/me/liked', {
        order_by: 'created_at DESC',
        limit: 100
      });
    }
  },

  beforeRender: function(data) {
    data.pictures = _.filter(_.pluck(data.likes, 'liked'), function(l) {
      return l.type === 'image';
    });
    return data;
  }

});
