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
    peopleSearchInput.addFacets(['location', 'industry', 'current-company']);
    peopleSearchInput.set({
      'cohorts-past-company' : [1223,1335,2039,7510,4425,1226,1224,1230,8760,1333,1177615,1343,8713,10268,1938783,1339,1400617,2040,1340,1592500,39105,45590,1328,1368,298473,66200,1233200,22314,1885414,109292,554610,1788220,2942,791722,1120855,1022991,2061386,242781,462659,1453152,729524,319508,1877670,71861,2256388,1806987,357140,977787,2010213,914299,2081476,1782431,377572,2172841,1061746,1255670,1318850,335638,157235,35493]
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