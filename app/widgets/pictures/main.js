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

