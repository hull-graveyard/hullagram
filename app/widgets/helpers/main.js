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
