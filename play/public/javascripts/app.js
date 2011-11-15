define(function(require) {
  var SignInView          = require('views/SignInView'),
      LoggedInView        = require('views/LoggedInView'),      
      peopleSearch        = require('search/peoplesearch'),
      channel             = require('util/channel');  
  
  var views = {};
  
  //Initialize the application
  function initialize() {        
    
    views['sign-in']    = new SignInView();
    views['logged-in']  = new LoggedInView();    

    //Check if user is already logged in to LinkedIn and authorized for our app
    IN.Event.on(IN, 'frameworkLoaded', function() {
      if(IN.User.isAuthorized()) {
        onLinkedInAuth();
      } else {
        views['sign-in'].render();
      }
    });

    //Get notified when the user authorizes our app on LinkedIn
    IN.Event.on(IN, 'auth', onLinkedInAuth);
    
  }

  //Render logged-in view
  function onLinkedInAuth() {
    var fields = ['firstName', 'headline', 'positions:(company)'];

    IN.API.Profile('me')
      .fields(fields)
      .result(function(data) {
        channel.pub('auth', 'user-data', data.values[0]);

        views['sign-in'].unrender();
        views['logged-in'].render();
      });
  }

  return {
    initialize: initialize
  };
});