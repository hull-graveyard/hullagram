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

