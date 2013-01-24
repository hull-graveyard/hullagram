/*global Hull:true */

Hull.widget('nav', {
  templates: ["nav"],

  initialize: function () {
    this.sandbox.on("hullagram.route", this.selectCurrent.bind(this));
  },
 
  selectCurrent: function (route) {
    this.$el
      .find("li.tab-item").removeClass("active")
      .filter("[data-hull-route=" + route + "]").addClass("active");
  },

  actions: {
    route: function (elt, evt, data) {
      evt.stopPropagation();
      if (!elt.hasClass("active")) {
        this.sandbox.emit("hullagram.route", data.route);
      }
    }
  }
});

