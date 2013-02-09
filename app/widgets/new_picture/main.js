/*global Hull:true _:true */
Hull.widget('new_picture', {
  templates: ['main'],

  initialize: function () {
    "use strict";
  },
  beforeRender: function (data) {
    data.source_url = this.options.source_url;
    data.blob = this.options.blob;
  },
  afterRender: function () {
    this.$notification = this.$el.find('.notification');
  },

  actions: {
    send: function (elt, evt, data) {
      evt.stopPropagation();
      elt.addClass('disabled-state');
      var textarea = document.getElementById('picture-description');

      this.$notification
        .attr('class', 'notification active fadeIn')
        .find('i').attr('class', 'icon-spinner icon-spin').end()
        .find('p').text('Sending');

      this.api.post('/me/images', {
        description: textarea.value,
        source_url: this.options.source_url,
        name: this.options.name
      }).then(function (image) {
          this.sandbox.emit('hullagram.picture.new', image);
          this.$notification
            .attr('class', 'notification active fadeOut animation-delay-long')
            .one('animationend webkitAnimationEnd', function(){
              app.router.trigger('route:picture', image.id);
            }.bind(this))
            .find('i').attr('class', 'icon-cloud-upload').end()
            .find('p').text('Sent');
        }.bind(this));
    }
  }
});
