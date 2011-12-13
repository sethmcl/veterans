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
    var hash = window.location.search.replace('?', '');
    var facets = ['location', 'industry', 'current-company'];
    var parts = hash.split('&');
    var urlParams = {};
    window.headContext = {};

    var cats = {
      'army' : [1223, 1226],
      'navy' : [1335],
      'airforce' : [157235],
      'marines' : [2039],
      'coastguard' : [4425]
    };

    var pastCompanies = [1223, 1335, 2039, 4425, 1226, 157235, 1224, 1230, 1333, 1343, 1938783, 1400617, 1592500, 1233200, 2061386, 462659, 1022991, 1877670, 377572, 2010213, 1061746];
    
    for(var i = 0, len = parts.length; i < len; i++) {
      var pair = parts[i].split('=');
      urlParams[pair[0]] = pair[1];
    }

    if(urlParams.f) {
      facets = urlParams.f.split(',');
    }

    if(urlParams.p) {
      //pastCompanies = urlParams.p.split(',');
      if(cats[urlParams.p]) {
        pastCompanies = cats[urlParams.p];
        headContext[urlParams.p + 'View'] = true;
        headContext.veteransType = urlParams.p.charAt(0).toUpperCase() + urlParams.p.slice(1);
      } else {
        headContext.allView = true;
      }
    } else {
      headContext.allView = true;
    }

    peopleSearchInput.addFacets(facets, true);
    peopleSearchInput.set({      
      'cohorts-past-company'  : pastCompanies,
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