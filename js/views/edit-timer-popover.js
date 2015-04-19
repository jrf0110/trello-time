var $ = require('jquery');
var utils = require('../lib/utils');
var bus = require('../lib/bus');

// Our custom popovers aren't being handled by trello for closing
// whenever you click outside, this handles the outside click
$( document.body ).on( 'click', function( e ){
  var $el = $('.pop-over');

  if ( !$el.hasClass('is-shown') ) return;

  while ( e.target !== e.currentTarget ){
    if ( e.target === $el[0] ) return;
    e.target = e.target.parentElement;
  }

  $el.removeClass('is-shown');
});

$( document.body ).on( 'submit', '#save-timer-form', function( e ){
  e.preventDefault();

  var $el = $( e.currentTarget );
  var id  = $el.data('card-id');

  var elapsed = [
    +$el.find('[name="hours"]').val()   * 60 * 60 * 1000
  , +$el.find('[name="minutes"]').val() * 60 * 1000
  , +$el.find('[name="seconds"]').val() * 1000
  ].reduce( function( a, b ){
    return a + b;
  }, 0 );

  bus.emit( 'timer:save', id, elapsed );

  $el.closest('.pop-over').removeClass('is-shown');
});

module.exports = function( cardId, timer, options ){
  options = utils.defaults( options || {}, {
    popoverTitle: 'Edit Timer'
  , editTimerTmpl: function( timer ){
      var duration = timer.duration();

      return [
        '<form id="save-timer-form" data-card-id=":card-id">'
      , '  <div class="duration-picker">'
      , '    <div class="duration-part hours">'
      , '      <label>Hours</label>'
      , '      <input type="number" name="hours" step="1" min="0" value=":hours" />'
      , '    </div>'
      , '    <div class="duration-part minutes">'
      , '      <label>Minutes</label>'
      , '      <input type="number" name="minutes" step="1" min="0" max="59" value=":minutes" />'
      , '    </div>'
      , '    <div class="duration-part seconds">'
      , '      <label>Seconds</label>'
      , '      <input type="number" name="seconds" step="1" min="0" max="59" value=":seconds" />'
      , '    </div>'
      , '  </div>'
      , '  <input type="submit" value="Save" class="primary wide confirm js-save-edit" />'
      , '</form>'
      ].join('\n')
        .replace( ':card-id',   cardId )
        .replace( ':hours',     duration.hours() )
        .replace( ':minutes',   duration.minutes() )
        .replace( ':seconds',   duration.seconds() );
    }
  });

  var $el = $('.pop-over');

  if ( module.exports.onFormSubmit ){
    $el.off( module.exports.onFormSubmit );
  }

  $el.render = function( data ){
    $el.find('.pop-over-header-title').html( options.popoverTitle );
    $el.find('.pop-over-content').html(
      options.editTimerTmpl( timer )
    );
    return $el;
  };

  $el.attachTo = function( $el2 ){
    var offset = $el2.offset();

    $el.css({
      top: offset.top + $el2.height() + 'px'
    , left: offset.left + 'px'
    });

    return $el.show();
  };

  $el.show = function(){
    $el.addClass('is-shown');
    return $el;
  };

  $el.hide = function(){
    $el.removeClass('is-shown');
    return $el;
  };

  return $el;
};