var request = require('superagent');
var _       = require('lodash');
var config  = require('../config');

var create = function( options ){
  options = _.defaults( options || {}, {
    baseUrl: 'https://trello.com/1'
  });

  if ( !options.apiKey ){
    throw new Error('Must provide `apiKey`');
  }

  return Object.create({
    options: options

  , auth: function( callback ){
      // request
    }

  , card: function( id, callback ){
      request
        .get( [ this.options.baseUrl, 'Cards', id ].join('/') )
        .query({ fields: 'all', stickers: true, attachments: true })
        .end( function( error, res ){
          if ( error ) return callback( error );

          callback( null, res.body );
        });
    }
  });
};

module.exports = create({
  apiKey: config.apiKey
});

module.exports.create = create;