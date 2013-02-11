/*global Hull:true */
Hull.widget('comment', {
  templates: ['main'],

  // This widget is just a wrapper for the comments@hull widget
  // to also fetch the list of user who like the picture
  datasources: {
    likes: ':id/likes'
  },

  beforeRender: function(data) {
    data.picture_id = this.options.id;
  }
});
