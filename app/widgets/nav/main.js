/*global Hull:true, app:true */

Hull.widget('nav', {
  templates: ["nav"],

  initialize: function () {

    // Upload send
    this.sandbox.on('hull.upload.send', function () {
      // Display a message during the upload
      this.$el.find('.notification')
        .attr('class', 'notification active fadeIn')
        .find('i').attr('class', 'icon-spinner icon-spin').end()
        .find('p').text('Uploading');
    }.bind(this));

    // Upload done
    this.sandbox.on('hull.upload.done', function (files) {
      _.map(files, function (file) {
        if (file.type && file.type.split("/")[0] === "image") {

          // Create the thumbnail/preview
          var img = document.createElement("img");
          var reader = new FileReader();
          reader.onload = function(e) {

            // Hide the notification message
            this.$el
              .find('.notification')
              .attr('class', 'notification active fadeOut animation-delay')
              .one('animationend webkitAnimationEnd', function() {
                // Highlight camera icon
                this.selectCurrent( this.$el.find('[data-route="camera"]') );

                // Redirect to the camera page
                app.router.trigger('route:camera', {
                  source_url: file.url,
                  name: file.name,
                  blob: e.target.result // Thumbnail
                });

              }.bind(this))
              .find('i').attr('class', 'icon-spinner icon-spin').end()
              .find('p').text('Uploading');

          }.bind(this);
          reader.readAsDataURL(file);

        }
      }.bind(this));
    }.bind(this));

  },

  selectCurrent: function (elt) {
    this.$el.find("li.tab-item").removeClass("active");
    elt.addClass("active");
  },

  actions: {
    route: function (elt, evt, data) {
      evt.stopPropagation();
      if(data.route !== 'camera') {
        this.selectCurrent(elt);
      }
    }
  }
});

