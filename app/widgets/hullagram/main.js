// This Widget is the main entry point for the app
// It handles the rendering of the whole app
// depending on the login status of the user
// If the user is already logged in it renders the widget called 'app'
// otherwise, it renders a login screen

Hull.widget('hullagram', {
  templates: ["main"],
  // Refresh (re-render) all on model.hull.me.change events
  // which are emitted whenever the user login status changes
  refreshEvents: ['model.hull.me.change']
});
