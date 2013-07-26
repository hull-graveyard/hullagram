// This widget displays a list of images fetched from
// the public activity feed of the app.

Hull.widget('pictures', {
  templates: ['main', 'picture', 'likes'],
  datasources: {
    activity: function() {

      // All pictures displayed in the app are fetched from the apps' activity feed.
      // this datasource builds a query to fetch all the "create Image" entries
      // and allows to filter either :
      // - by actor_id to get all the images created by a specific user
      // - by obj_id : to get a single image
      // - or to get the latest public images on the feed

      var where = { obj_type: 'Image', verb: 'create' };

      // Filter by actor_id to get the latest pictures of a user
      // this.options.userId come from a data attribute passed to the widget like this:
      // <div data-hull-widget='pictures' data-hull-user-id='xxxxxxxxx'>
      if (this.options.userId) {
        where.actor_id = this.options.userId;
      }

      // Filter by obj_id to get a single picture
      // this.options.id come from a data attribute passed to the widget like this:
      // <div data-hull-widget='pictures' data-hull-id='xxxxxxxxx'>
      if (this.options.id) {
        where.obj_id = this.options.id;
      }

      return this.api('app/activity', {
        limit: 10,
        where: where,
        order_by: 'created_at DESC'
      });
    },

    likes: function() {
      // If we display a single picture, we also get the list of Users who liked it
      if (this.options.id) {
        return this.api(this.options.id + '/likes');
      }
    }
  },

  actions: {
    back: function() {
      this.sandbox.emit('hullagram.back');
    }
  },

  beforeRender: function (data) {
    if (this.options.id) {
      data.single_picture_id = this.options.id;
    }

    // The activity datasource returns a list of activities (cf. http://alpha.hull.io/docs/api/activities)
    // Here we are only interested in the 'object' inside the activity, which is the Image Object (cf. http://alpha.hull.io/docs/api/resources)
    data.pictures = this.sandbox.util._.pluck(data.activity, 'object');
  }
});
