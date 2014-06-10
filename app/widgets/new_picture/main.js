Hull.widget('new_picture', {
  templates: ['main'],

  beforeRender: function (data) {
    data.source_url = this.options.source_url;
    data.blob = this.options.blob;
  },

  actions: {
    send: function (event, options) {
      var _ = this.sandbox.util._;
      $(options.el).addClass('disabled-state');
      var textarea = document.getElementById('picture-description');

      this.sandbox.emit('hullagram.savingPicture');

      var description = textarea.value;
      var tags = _.map(description.match(/\B#([^ ]+)/g), function(t) {
        return t.replace('#', '');
      });

      var img = {
        description: description,
        source_url: this.options.source_url,
        name: this.options.name,
        tags: tags
      };

      this.api.post('/me/images', img).then(function (image) {
        this.sandbox.emit('hullagram.pictureSaved', image);
      }.bind(this));
    }
  }
});
