/*global Hull:true */

Hull.widget('app', {
  templates: ["my_pictures", "explore", "new_picture", "friends", "profile"],
  
  initialize: function () {
    "use strict";
    this.sandbox.on('hullagram.route', this.render.bind(this));
  }
});

