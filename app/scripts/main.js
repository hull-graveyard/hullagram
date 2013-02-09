require(['lib/hull'], function(hull) {
  window.app = hull({
    appId: '5103a56f93e74e3a1f000012',
    orgUrl: 'http://hull-demos.alpha.hullapp.io'
  });

  // Handler Bars Helpers
  // Print comma separated list
  // return a comma-serperated list from an iterable object
  Handlebars.registerHelper('csv', function(items, options) {
    var out = "";
    for(var i=0, l=items.length; i<l; i++) {
      out += options.fn(items[i]);
      if (i === l - 2) {
        out += ' and ';
      } else if (i < l - 1) {
          out += ', ';
      }
      // might want to add a newline char or something
    }
    return out;
  });

});
