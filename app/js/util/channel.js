// channel.js
define(function(require) {
  var Events = require('util/events');
  
  var Channel = (function() {
    var _this = this;   
    var _channels = {};

    function _sub(channelName, eventType, fn) {
      var channel = _channels[channelName];

      if(typeof channel === 'undefined') {
        _channels[channelName] = channel = new Events();          
      }

      channel.on(eventType, fn);
      return this;
    }

    function _unsub(channelName, eventType, fn) {
      var channel = _channels[channelName];

      if(typeof channel === 'undefined') return this;

      channel.off(eventType, fn);
      return this;
    }

    function _pub(channelName, eventType, eventData) {
      var channel = _channels[channelName];

      if(typeof channel === 'undefined') return this;

      channel.fire(eventType, eventData);
      return this;      
    }

    return {
      sub:  _sub,
      unsub:  _unsub,
      pub:  _pub
    };
  })();

  return Channel;
});