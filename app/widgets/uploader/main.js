// All the heavylifting for pictures upload
// is handled by the widget upload@hull
// Here we attach event handlers on the different steps of the upload process
//
// This widget is only used to display overlayed notifications...

Hull.widget('uploader', {

  templates: ['uploader'],

  initialize: function() {
    // Events emitted by the 'upload@hull' widget.
    this.sandbox.on('hull.upload.send', this.onUploadSend, this);
    this.sandbox.on('hull.upload.done', this.onUploadDone, this);
    this.sandbox.on('hull.upload.progressall', this.onUploadProgress, this);

    // Events emitted by the 'new_picture' widget.
    this.sandbox.on('hullagram.pictureSaved', this.onPictureSaved, this);
    this.sandbox.on('hullagram.savingPicture', this.onSavingPicture, this);
  },

  afterRender: function() {
    // Just to have a handle on the notification element...
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

  onUploadProgress: function(e) {
    var percent = Math.round(100 * e.data.loaded / e.data.total);
    this.$notification.find('p').text('Uploading (' + percent + '%)');
  },

  onUploadDone: function (e) {
    var files = e.data.files;
    // We use the FileReader API to display
    // the uploaded image... saves some bandwith ;-)
    // We could apply instagram style filters here if we were more brave...
    var file = files[0];
    if (file.type && file.type.split("/")[0] === "image") {
      // Create the thumbnail/preview
      var img = document.createElement("img"),
          reader = new FileReader(),
          self = this;
      reader.onload = function(e) {
        // Hide the notification message
        self.$notification
          .attr('class', 'notification active fadeOut animation-delay')
          .one('animationend webkitAnimationEnd', function() {
            // All right, the file uploaded is a picture and we were able to
            // preview it...
            // delegate the rest to someone else.
            self.sandbox.emit('hullagram.newPicture', {
              source_url: file.url,
              name: file.name,
              blob: e.target.result // Thumbnail
            });

          })
          .find('i').attr('class', 'icon-spinner icon-spin').end()
          .find('p').text('Uploading');
      };
      reader.readAsDataURL(file);
    }
  }

});
