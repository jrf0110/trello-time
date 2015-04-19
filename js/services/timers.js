var _       = require('lodash');
var timers  = require('../models/timer');
var config  = require('../config');

var create = function( options ){
  options = _.defaults( options || {}, {
    
  });

  return Object.create({
    options: options

  , key: 'trello_time_timers'

  , get: function(){
      var result;

      try {
        result = JSON.parse( localStorage.getItem( this.key ) ) || {};
      } catch( e ){
        result = {};
      }

      Object.keys( result ).forEach( function( key ){
        result[ key ] = timers( result[ key ] );
      });

      return result;
    }

  , save: function( data ){
      localStorage.setItem( this.key, JSON.stringify( data ) );
    }
  });
};

module.exports = create({
  
});

module.exports.create = create;