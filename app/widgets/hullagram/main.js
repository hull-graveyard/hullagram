//@TODO Provide a method to do a textual selection of the template to be rendered (before Widget::render)
Hull.widget('hullagram', {
  templates: ["main"],
  // Refresh all on me.change : ie when logged in or out
  refreshEvents: ['model.hull.me.change']
});
