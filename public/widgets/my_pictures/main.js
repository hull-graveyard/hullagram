/*global Hull:true */
Hull.widget('my_pictures', {
  templates: ['main'],
  datasources: {
    pictures: 'me/images'
  },
  initialize: function () {
    "use strict";
    this.sandbox.on("hullagram.picture.new", function (newImage) {
      this.datasources.pictures.push(newImage);
    }.bind(this));
  },
  beforeRender: function (data) {
    "use strict";
    data.pictures.reverse();
    return data;
  }
});

