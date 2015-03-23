var _ = require('lodash');

module.exports = {
  trelloClientUrl: 'https://api.trello.com/1/client.js'
};

_.extend( module.exports, require('./config.local') );