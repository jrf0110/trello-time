var $       = require('jquery');
var bus     = require('../lib/bus');

var views = {
  timerButton:      require('./timer-button')
, editTimerButton:  require('./edit-timer-button')
};

module.exports = function( $window, id, timer ){
  [ views.editTimerButton( id, timer )
  , views.timerButton( id, timer )
  ].forEach( function( $el ){
    $window.find('.other-actions > .u-clearfix').prepend( $el );
  });

  $window.cleanup = function(){
    
  };

  return $window;
};