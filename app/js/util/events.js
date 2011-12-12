// events.js
define(function() {
  function Events() {
    var _this = this;
    var _handlers = {};
    var _reservedProperties = ['fire', 'on', 'off'];      
    
    function _validate() {
      var prop;
      var type;

      // check to make sure object does not already contain reserved properties
      for(var i = 0, len = _reservedProperties.length; i < len; i++) {
        prop = _reservedProperties[i];
        type = typeof _this[prop];
          
        if(type !== 'undefined') {
          throw Error('Object already contains "' + prop + '" property (' + type + ')');
        } 
      }     
    }
    _validate();
    
    this.fire = function(eventType, args) {
      var eventHandlers;
      var index;
      
      // If first argument is an object, make sure it contains the event type in the
      // type property
      if(typeof eventType === 'object' && typeof eventType.type !== 'string') {
        throw Error('Event type not specified');
      }
      
      // If the second parameter is not an object, convert it to one
      if(typeof args !== 'object') {
        args = {
          data: args
        };
      }
      
      // If event type is an object, extract type. Set args to eventType since
      // in this case the eventType object represents the event to be sent
      // (the args)
      if(typeof eventType === 'object' && typeof eventType.type === 'string') {
        args = eventType;
        eventType = eventType.type;
      } else {
        args.type = eventType;
      }
      
      // Make sure the event type exists in our event store
      eventHandlers = _handlers[eventType];
      
      if (!eventHandlers) {
        return false;
      }
      
      // Iterate over handlers for this event and notify each one
      index = eventHandlers.length;
      
      while (index--) {
        eventHandlers[index].call(_this, args);
      }
      
      return true;
    };
    
    this.on = function(eventType, func, scope) {

      if(scope) {
        func = function() {
          func.apply(scope, arguments);
        }
      }
      
      if(typeof eventType !== 'string') {
        throw Error('Expected string for event type, found ' + typeof eventType);
      }
      
      if(typeof func !== 'function') {
        throw Error('Expected function, found ' + typeof func);
      }
      
      if (!_handlers[eventType]) {
        _handlers[eventType] = [];
      }
      
      if(_handlers[eventType].indexOf(func) == -1) {
        _handlers[eventType].push(func);
      }
      
      return func;
    };
    
    this.off = function(eventType, func) {
      
      var eventHandlers;
      
      if(typeof eventType !== 'string') {
        throw Error('Expected string for event type, found ' + typeof eventType);
      }
      
      if(typeof func !== 'function') {
        throw Error('Expected function, found ' + typeof func);
      }
      
      eventHandlers = _handlers[eventType];
      
      if(eventHandlers) {
        for(var i = eventHandlers.length - 1; i >= 0; i--) {
          if(eventHandlers[i] === func) {
            eventHandlers.splice(i, 1);
            return true;
          }
        }
      }
      
      return false;
      
    };
  }
  return Events;
});