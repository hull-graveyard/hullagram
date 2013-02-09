/*global Hull:true */
Hull.widget('picture', {
  templates: ['main'],
  datasources: {
    pictures: ':id',
    likes: ':id/likes'
  },
  beforeRender: function (data) {
    data.comment_id = this.options.id;
  }
});

