/*global Hull:true, _:true */

Hull.widget('app', {
  templates: ["my_pictures", "explore", "new_picture", "friends", "profile"],
  
  initialize: function () {
    "use strict";
    this.sandbox.on('hullagram.route', this.render.bind(this));
    this.sandbox.on('hull.upload.done', function (files) {
      _.map(files, function (file) {
        if (file.type && file.type.split("/")[0] === "image") {
          this.api.post('/me/images', { source_url: file.url, name: file.name  })
            .then(function (image) {
              this.sandbox.emit('hullagram.picture.new', image);
            }.bind(this));
        }
      }.bind(this));
    }.bind(this));

  }
});

