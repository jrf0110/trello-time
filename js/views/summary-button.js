var $       = require('jquery');
var bus     = require('../lib/bus');

module.exports = function(){
  var $el = $([
    '<li>'
  , '  <a href="#" class="nav-list-item js-open-power-ups">'
  , '    <span class="icon-sm icon-clock icon-type"></span>'
  , '    Time Summary'
  , '  </a>'
  , '</li>'
  ].join('\n'));

  $el.click( function( e ){
    e.preventDefault();
  });

  $el.find('> a').click( function( e ){
    e.preventDefault();
    bus.emit('request-summary');  
    return false;
  });

  return $el;
};