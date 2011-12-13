define(function(require) {
  var enabled = (window.location.search.indexOf('debug') !== -1);

  return function(m) {
    if(console && 'log' in console && enabled) {
      console.log(m);
    }
  };
});