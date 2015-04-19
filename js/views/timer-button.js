var fs      = require('fs');
var $       = require('jquery');
var bus     = require('../lib/bus');

module.exports = function( id, timer ){
  var $el = $([
    '<a href="#"'
  , ' class="button-link js-start-timer"'
  , '  title="Toggle card timer"'
  , '  data-id=":id">'.replace( ':id', id )
  , '  <span class="icon-sm icon-clock"></span>'
  , '  <span class="elapsed">:elapsed</span>'.replace( ':elapsed', timer )
  , '  <span class="btn-text btn-text-start">'
  , '    Start'
  , '  </span>'
  , '  <span class="btn-text btn-text-stop">'
  , '    Stop'
  , '  </span>'
  , '</a>'
  ].join('\n'));

  var $elapsed = $el.find('.elapsed');

  $el.click( function( e ){
    e.preventDefault();
    $el.toggle();
  });

  $el.toggle = function(){
    $el.toggleClass('active');
    bus.emit( 'timer:toggle', id );
  };

  timer.on( 'tick', function(){
    $elapsed.text( timer );
  });

  if ( timer.isTicking() ){
    $el.addClass('active');
  }

  return $el;
};