define(function(require) {
  var templateName = 'logged-in';
  var templateMarkup = require('text!templates/logged-in.dust');

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({
    el: $('#logged-in'),    
    events: {},
    initialize: function() {
      _.bindAll(this, 'render', 'unrender');      
    },
    render: function() {
      var el = $(this.el);

      dust.render(templateName, {}, function(err, out) {
        el.html(out);
      });
    },
    unrender: function() {
      $(this.el).remove();
    }
  });
});