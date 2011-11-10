define(function(require) {
  var views = {};
  
  //Initialize the application
  function initialize() {    
    var SignInView      = require('views/sign-in'),
        LoggedInView    = require('views/logged-in');

    views['sign-in']    = new SignInView();
    views['logged-in']  = new LoggedInView();

    //Check if user is already logged in to LinkedIn and authorized for our app
    IN.Event.on(IN, 'frameworkLoaded', function() {
      if(IN.User.isAuthorized()) {
        views['logged-in'].render();
      } else {
        views['sign-in'].render();
      }
    });

    //Get notified when the user authorizes our app on LinkedIn
    IN.Event.on(IN, 'auth', function() {
      views['sign-in'].unrender();
      views['logged-in'].render();
    });
    
  }

  return {
    initialize: initialize
  };
});