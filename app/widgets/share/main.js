/*global Hull:true */
Hull.widget('share', {
  templates: ['main'],

  actions: {
    back: function() {
      this.sandbox.emit('hullagram.back')
    },
    share: function (elt, evt, data) {
      // Temporary
      var textarea = document.getElementById('share-description'),
          description = textarea.value,
          params = window.location.protocol+data.source_url+'&text='+description+'&via=hull',
          url = 'https://twitter.com/share?url='+params;
      window.open(url);
    }
  }
});

