Hull.widget('uploader', {

  templates: ['uploader'],

  initialize: function() {
    this.sandbox.on('hull.upload.send', _.bind(this.onUploadSend, this));
    this.sandbox.on('hull.upload.done', _.bind(this.onUploadDone, this));
    this.sandbox.on('hullagram.pictureSaved', _.bind(this.onPictureSaved, this));
    this.sandbox.on('hullagram.savingPicture', _.bind(this.onSavingPicture, this));
  },

  afterRender: function() {
    this.$notification = this.$el.find('.notification');
  },

  onUploadSend: function() {
    // Display a message during the upload
    this.$notification
      .attr('class', 'notification active fadeIn')
      .find('i').attr('class', 'icon-spinner icon-spin').end()
      .find('p').text('Uploading');
  },

  onPictureSaved: function(picture) {
    this.$notification
      .attr('class', 'notification active fadeOut animation-delay-long')
      .one('animationend webkitAnimationEnd', function(){
        // app.router.trigger('route:picture', picture.id);
        this.sandbox.emit('hullagram.route', '/pictures/' + picture.id);
      }.bind(this))
      .find('i').attr('class', 'icon-cloud-upload').end()
      .find('p').text('Sent');
  },

  onSavingPicture: function() {
    this.$notification
        .attr('class', 'notification active fadeIn')
        .find('i').attr('class', 'icon-spinner icon-spin').end()
        .find('p').text('Sending');
  },

  onUploadDone: function (files) {
    var file = files[0];
    if (file.type && file.type.split("/")[0] === "image") {
      // Create the thumbnail/preview
      var img = document.createElement("img");
      var reader = new FileReader();
      reader.onload = _.bind(function(e) {
        // Hide the notification message
        this.$notification
          .attr('class', 'notification active fadeOut animation-delay')
          .one('animationend webkitAnimationEnd', function() {
            // Redirect to the camera page
            this.sandbox.emit('hullagram.newPicture', {
              source_url: file.url,
              name: file.name,
              blob: e.target.result // Thumbnail
            });

          }.bind(this))
          .find('i').attr('class', 'icon-spinner icon-spin').end()
          .find('p').text('Uploading');

      }, this);
      reader.readAsDataURL(file);
    }
  }

});
