var fs      = require('fs');
var $       = require('jquery');
var bus     = require('../lib/bus');
var popover = require('./edit-timer-popover');

module.exports = function( id, timer ){
  var $el = $([
    '<a href="#"'
  , ' class="button-link js-edit-timer"'
  , '  title="Toggle card timer"'
  , '  data-id=":id">'.replace( ':id', id )
  , '  <span class="icon-sm icon-clock"></span>'
  , '  Edit Time'
  , '</a>'
  ].join('\n'));

  $el.click( function( e ){
    popover( id, timer )
      .render()
      .attachTo( $el );
    e.preventDefault();
  });

  return $el;
};