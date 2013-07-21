Hull.widget('new_picture', {
  templates: ['main'],

  beforeRender: function (data) {
    data.source_url = this.options.source_url;
    data.blob = this.options.blob;
  },

  actions: {
    send: function (evt, elt, data) {
      debugger
      $(elt).addClass('disabled-state');
      var textarea = document.getElementById('picture-description');

      this.sandbox.emit('hullagram.savingPicture');

      this.api.post('/me/images', {
        description: textarea.value,
        source_url: this.options.source_url,
        name: this.options.name
      }).then(function (image) {
        this.sandbox.emit('hullagram.pictureSaved', image);
      }.bind(this));
    }
  }
});
