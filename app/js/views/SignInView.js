define(function(require) {
  var templateName = 'SignInView';
  var templateMarkup = require('text!templates/SignInView.dust');

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({
    el: $('#sign-in-view'),
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