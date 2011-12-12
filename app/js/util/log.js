define(function(require) {
  return function(m) {
    if(console && 'log' in console) {
      console.log(m);
    }
  };
});