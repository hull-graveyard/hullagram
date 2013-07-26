/*global Hull:true */

Hull.widget('share', {
  templates: ['main'],

  datasources: {
    picture: ':id'
  },

  actions: {
    back: function() {
      this.sandbox.emit('hullagram.back');
    },

    share: function (event, options) {
      var textarea = document.getElementById('share-description');
      var description = textarea.value;
      var params = window.location.protocol + options.data.sourceUrl + '&text=' + description + '&via=hull';
      var url = 'https://twitter.com/share?url=' + params;

      window.open(url);
    }
  }
});
