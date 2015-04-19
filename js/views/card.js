var $ = require('jquery');

var badge = function(){
  return $([
    '<div title="This card has a timer running"'
  , '  class="badge badge-timer">'
  , '  <span class="badge-icon icon-sm icon-clock"></span>'
  , '</div>'
  ].join('\n'));
};

module.exports = function( $el, options ){
  $el.toggleTimer = function( clamp ){
    var $badge = $el.find('.badge-timer');

    if ( $badge.length ){
      if ( !clamp ){
        $badge.remove();
      }
    } else {
      if ( clamp !== false ){
        $el.find('.badges').append( badge() );
      }
    }
  };

  return $el;
};

module.exports.fromId = function( id, options ){
  var $el = $('.list-card-title[href*="' + id + '"]').closest('.list-card');
  return module.exports( $el, options );
};