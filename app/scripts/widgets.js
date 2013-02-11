/*global Hull:true, _:true, Backbone:true, app:true */
Hull.widget('app', {
  templates: ["pictures", "share", "comments", "likes", "new_picture", "friends", "users", "profile", "nav"],

  initialize: function () {

    this.initRouter();

    this.sandbox.on('hullagram.newPicture', _.bind(function(pic) {
      this.render('new_picture', pic);
    }, this));

  },

  initRouter: function() {
    var HullagramRouter = Backbone.Router.extend({
      routes: {
        ':view(/:id)(/:action)' : 'view'
      }
    });

    router = new HullagramRouter();

    router.on('route:view', _.bind(function(view, id, action) {
      var tpl = action || view || 'pictures';
      if (!_.include(this.templates, tpl)) {
        tpl = 'pictures';
      }
      this.currentView = tpl;
      this.render(tpl, { id: id });
    }, this));

    this.sandbox.on('hullagram.route', function(route) {
      router.navigate(route, { trigger: true });
    });

  },

  beforeRender: function(data) {
    data.currentView = this.currentView;
    return data;
  },

  afterRender: function() {
    var tab = this.$el.find("li.tab-item." + this.currentView)
    tab.addClass("active");
  }
});





//--------


/*global Hull:true */
Hull.widget('comment', {
  templates: ['main', 'likes'],
  datasources: {
    likes: ':id/likes'
  },
  beforeRender: function (data) {
    data.comment_id = this.options.id;
  }
});




//--------


//@TODO Provide a method to do a textual selection of the template to be rendered (before Widget::render)
Hull.widget('hullagram', {
  templates: ["main"],
  // Refresh all on me.change : ie when logged in or out
  refreshEvents: ['model.hull.me.change']
});




//--------


/*global Hull:true _:true */
Hull.widget('likes', {

  templates: ['main'],

  datasources: {
    likes: function() {
      return this.api('hull/me/liked', {
        order_by: 'created_at DESC',
        limit: 100
      });
    }
  },

  beforeRender: function(data) {
    data.pictures = _.filter(_.pluck(data.likes, 'liked'), function(l) {
      return l.type === 'image';
    });
    return data;
  }

});




//--------


Hull.widget('new_picture', {
  templates: ['main'],

  beforeRender: function (data) {
    data.source_url = this.options.source_url;
    data.blob = this.options.blob;
  },

  actions: {
    send: function (elt, evt, data) {
      elt.addClass('disabled-state');
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




//--------


/*global Hull:true */
Hull.widget('pictures', {
  templates: ['main', 'picture', 'likes'],
  datasources: {
    activity: function() {
      var where = { obj_type: 'Image', verb: 'create' };

      if (this.options.user_id) {
        where.actor_id = this.options.user_id;
      }

      if (this.options.id) {
        where.obj_id = this.options.id;
      }

      return this.api('hull/app/activity', {
        limit: 10,
        where: where,
        order_by: 'created_at DESC'
      });
    },
    likes: function() {
      if (this.options.id) {
        return this.api('hull/' + this.options.id + '/likes');
      }
    }
  },


  beforeRender: function (data) {
    if (this.options.id) {
      data.single_picture_id = this.options.id;
    }
    data.pictures = _.pluck(data.activity, 'object');
  },
  actions: {
    route: function (elt, evt, data) {
      this.sandbox.emit("hullagram.route", data.route, data);
    }
  }
});





//--------


/*global Hull:true */
Hull.widget('profile', {

  templates: ['main'],

  datasources: {
    user:     ':id',
    friends:  ':id/friends'
  },

  initialize: function() {
    this.options.id = this.options.id || 'me';
  },

  beforeRender: function (data) {
    data.isMe = data.user.id === data.me.id;
  }

});





//--------


/*global Hull:true */
Hull.widget('share', {
  templates: ['main'],
  datasources: {
    pictures: ':id'
  },

  beforeRender: function(data) {
    console.warn("Share Data", data);
  },

  actions: {
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





//--------


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
