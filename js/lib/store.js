var bus = require('./bus');
var trello = require('../services/trello');

var state = module.exports = {
  trello: {
    state: 'pending'
  , token: null
  }
};

bus.on('authenticate-trello', function(){

});