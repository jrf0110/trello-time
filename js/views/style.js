var fs = require('fs');
var $ = require('jquery');

var contents = fs.readFileSync(
  __dirname + '/../../dist/core-trello-time-cs.css'
);

module.exports = function( options ){
  var el = document.createElement('style');

  el.type       = 'text/css';
  el.innerHTML = contents;

  return el;
};