define(function(require) {
  var SignInView          = require('views/SignInView'),
      LoggedInView        = require('views/LoggedInView'),      
      peopleSearch        = require('search/peoplesearch'),
      peopleSearchInput   = require('models/peopleSearchInput'),
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
    var hash = window.location.hash.replace('#', '');
    var facets = ['location', 'industry', 'current-company'];

    if(hash.length > 0) {
      facets = hash.split(',');
    }
    

    peopleSearchInput.addFacets(facets, true);
    peopleSearchInput.set({      
      'cohorts-past-company'  : [1223, 1335, 2039, 4425, 1226, 157235, 1224, 1230, 1333, 1343, 1938783, 1400617, 1592500, 1233200, 2061386, 462659, 1022991, 1877670, 377572, 2010213, 1061746],
      'keywords'              : 'united states',
      'sort'                  : 'distance'
    }); 

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