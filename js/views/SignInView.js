define(function(require) {
  var templateName = 'sign-in';
  var templateMarkup = require('text!templates/sign-in.dust');

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({
    el: $('#sign-in'),
    events: {},
    initialize: function() {
      _.bindAll(this, 'render', 'unrender');      
    },
    render: function() {
      var el = $(this.el);

      dust.render(templateName, {}, function(err, out) {
        el.html(out);
        IN.parse(el[0]);
      });
    },
    unrender: function() {
      $(this.el).remove();
    }
  });
});