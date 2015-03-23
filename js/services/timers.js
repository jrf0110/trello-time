var _       = require('lodash');
var config  = require('../config');

var create = function( options ){
  options = _.defaults( options || {}, {
    
  });

  return Object.create({
    options: options

  , get: function( id ){
      var result;

      try {
        result = JSON.parse( localStorage.getItem( id ) );
      } catch( e ){
        result = {};
      }

      return result;
    }

  , set: function( data ){
      localStorage.setItem( data.id, JSON.stringify( data ) );
    }
  });
};

module.exports = create({
  
});

module.exports.create = create;