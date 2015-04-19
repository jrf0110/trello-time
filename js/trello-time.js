var $ = require('jquery');
var bus = require('./lib/bus');
var utils = require('./lib/utils');

var services = {
  trello: require('./services/trello')
, timers: require('./services/timers')
};

var models = {
  timers: require('./models/timer')
};

var views = {
  timerButton:      require('./views/timer-button')
, editTimerButton:  require('./views/edit-timer-button')
, summaryButton:    require('./views/summary-button')
, style:            require('./views/style')
, card:             require('./views/card')
, cardWindow:       require('./views/card-window')
, cardsCsv:         require('./views/cards-csv')
, cardsConsole:     require('./views/cards-console')
};

var state = window.state = Object.create({
  activeCard: {
    isOpen: utils.parseUrl().cardOpen
  , state:  'pending'
  , id:     null
  , data:   null
  }

, reset: function(){
    this.activeCard.isOpen = false;
    this.activeCard.state  = 'pending';
    this.activeCard.id     = null;
    this.activeCard.data   = null;

    return this;
  }

, timers: services.timers.get() || {}

, save: function(){
    services.timers.save( this.timers );
  }
});

if ( state.activeCard.isOpen ){
  state.activeCard.id = utils.parseUrl().cardId;
}

bus.on('timer:save', function( id, elapsed ){
  var timer = state.timers[ id ] = state.timers[ id ] || models.timers();
  timer.elapsed = elapsed;
  timer.emit('tick');
  state.save();
});

bus.on('card:open', function( id ){
  var timer = state.timers[ id ] = state.timers[ id ] || models.timers();

  $(function(){
    views.cardWindow( $('.window'), id, timer );
  });
});

bus.on('card:close', function( id, card ){
  console.log('card:close', card );
});

bus.on('timer:toggle', function( id ){
  var timer = state.timers[ id ];
  timer.toggle();
  views.card.fromId( id ).toggleTimer( timer.isTicking() );
  state.save();
});

bus.on('request-summary', function(){
  var timers = services.timers.get();

  var idList = Object.keys( timers )
    .filter( function( id ){
       return $( '[href*="{id}"].list-card-title'.replace( '{id}', id ) ).length;
    });

  utils.async.map(
    idList
  , services.trello.card.bind( services.trello )
  , function( error, cards ){
      cards.forEach( function( card, i ){
        card.timer = timers[ idList[ i ] ];
      });

      views.cardsConsole( cards );
      window.location = 'data:text/csv;charset=utf-8,' + encodeURIComponent( views.cardsCsv( cards ) );
    }
  );  
});

if ( state.activeCard.isOpen ){
  bus.emit( 'card:open', state.activeCard.id );
}

$(function(){
  document.head.appendChild( views.style() );

  var $body = $(document.body);
  var $cardWindow = $('.window');

  $('.nav-list').prepend( views.summaryButton() );

  var onMutations = function( mutations ){
    mutations = mutations.filter( function( mutation ){
      return mutation.attributeName === 'style';
    });

    if ( mutations.length === 0 ) return;

    var display = mutations[0].target.style.display;

    if ( !state.activeCard.isOpen && display === 'block' ){
      var url = utils.parseUrl();

      state.activeCard.isOpen = true;
      state.activeCard.id = url.cardId;
      state.activeCard.state = 'loading';

      bus.emit( 'card:open', state.activeCard.id );

      services.trello.card( url.cardId, function( error, card ){
        if ( error ){
          state.activeCard.state = 'error';
          return bus.emit( 'card:error', error );
        }

        state.activeCard.state = 'loaded';
        state.activeCard.data = card;

        bus.emit( 'card:loaded', state.activeCard.id, card );
      });
    } else if ( state.activeCard.isOpen && display === 'none' ){
      var id    = state.activeCard.id;
      var data  = state.activeCard.data;

      state.reset();

      bus.emit( 'card:close', id, data );
    }
  };

  var $windowObserver = new MutationObserver( onMutations );

  $windowObserver.observe( $cardWindow[0], {
    attributes: true
  });
});