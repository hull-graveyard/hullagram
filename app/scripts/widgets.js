/*global Hull:true, _:true, Backbone:true, app:true */
Hull.widget('app', {
  templates: ["feed","share","comment","picture","likes", "new_picture", "friends", "profile"],

  initialize: function () {
    "use strict";
    this.initRouter();
  },

  initRouter: function () {
    var HullagramRouter = Backbone.Router.extend({
      routes: {
        'feed': 'feed',
        'likes': 'likes',
        'camera' : 'camera',
        'friends': 'friends',
        'profile': 'profile',
        'profile/:id': 'profile',
        'comments/:id': 'comments',
        "picture/:id": "picture",
        "share/:id": "share"
      }
    });

    app.router = new HullagramRouter();
    app.router.on('route:feed', function () {
      this.render('feed');
    }.bind(this));

    app.router.on('route:likes', function () {
      this.render('likes');
    }.bind(this));

    app.router.on('route:picture', function (id) {
      this.render('picture', {id: id});
    }.bind(this));

    app.router.on('route:share', function (id) {
      this.render('share', {id: id});
    }.bind(this));

    app.router.on('route:camera', function (data) {
      this.render('new_picture', data);
    }.bind(this));

    app.router.on('route:friends', function () {
      this.render('friends');
    }.bind(this));

    app.router.on('route:comments', function (id) {
      this.render('comment', {id: id});
    }.bind(this));

    app.router.on('route:profile', function (id) {
      this.render('profile', {id: id || 'me'});
    }.bind(this));

  }
});





//--------


/*global Hull:true */
Hull.widget('comment', {
  templates: ['main'],
  datasources: {
    likes: ':id/likes'
  },
  beforeRender: function (data) {
    data.comment_id = this.options.id;
  }
});



//--------


/*global Hull:true */
Hull.widget('feed', function() {
  var activity;
  return {
    templates: ['main'],
    datasources: {
      activity: function() {
        if (activity) {
          return activity;
        } else {
          return this.api('hull/app/activity', {
            limit: 10,
            where: { obj_type: 'Image', verb: 'create' },
            order_by: 'created_at DESC'
          });
        }
      }
    },
    beforeRender: function (data) {
      activity = data.activity;
      data.pictures = _.pluck(data.activity, 'object');
    },
    actions: {
      route: function (elt, evt, data) {
        evt.stopPropagation();
        this.sandbox.emit("hullagram.route", data.route, data);
      }
    }
  };
});





//--------


Hull.widget('friends_list', {
  templates: ['friends_list', 'friend'],
  datasources: {
    friends: "me/friends"
  },

  actions: {
    backToFriendsList: function (elt, evt, data) {
      evt.stopPropagation();
      this.render('friends_list');
    }
  }
});




//--------


// This widget holds as a placeholder for partials, as Hull does not provide
// (to my knowledge) automatic registration for partials
// @TODO Integrate directly wihin Hull, with a correct syntax
Hull.widget('helpers', {
  templates: ['empty', 'likes', 'picture_view','notice'],

  beforeRender: function () {
    this.templates.forEach(function (tpl) {
      Handlebars.registerPartial('helpers.' + tpl, Hull.templates['helpers/' + tpl]);
    });
  }
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


/*global Hull:true */

//@TODO Provide a method to do a textual selection of the template to be rendered (before Widget::render)
Hull.widget('main', {
  templates: ["main"]
});




//--------


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





//--------


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




//--------


/*global Hull:true */
Hull.widget('picture', {
  templates: ['main'],
  datasources: {
    pictures: ':id',
    likes: ':id/likes'
  },
  beforeRender: function (data) {
    data.comment_id = this.options.id;
  }
});





//--------


/*global Hull:true */
Hull.widget('profile', {

  templates: ['main'],

  datasources: {
    user:     ':id',
    friends:  ':id/friends',
    pictures: ':id/images',
    likes:    ':id/liked'
  },

  beforeRender: function (data) {
    data.isMe = data.user.id === data.me.id;
  },

  actions: {
    route: function (elt, evt, data) {
      this.sandbox.emit("hullagram.route", data.route, data);
    }
  }
});





//--------


/*global Hull:true */
Hull.widget('share', {
  templates: ['main'],
  datasources: {
    pictures: ':id'
  },
  actions: {
    share: function (elt, evt, data) {
      evt.stopPropagation();
      // Temporary
      var textarea = document.getElementById('share-description'),
          description = textarea.value,
          params = window.location.protocol+data.source_url+'&text='+description+'&via=hull',
          url = 'https://twitter.com/share?url='+params;
      window.open(url);
    }
  }
});

