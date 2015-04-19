var $         = require('jquery');
var config    = require('./config');
var pages     = require('./views/pages');
var bus       = require('./lib/bus');

pages('authenticate', {

});

pages('post-auth', {

});

// require('./3rd-party/trello-client').init({
//   key: config.apiKey
// });

bus.on('trello-auth', function(){
  bus.emit('change-page', 'post-auth');
});

bus.on( 'change-page', function( page ){
  pages[ page ].activate();
});

// Trello.authorize({
//   interactive: false
// , success: function(){
//     bus.emit('trello-auth');
//   }
// });

$(function(){
  for ( var key in pages ){
    if ( 'init' in pages[ key ] ){
      pages[ key ].init();
    }
  }

  bus.emit('change-page', 'authenticate');

  $('[data-role="trello-connect"]').click( function( e ){
    e.preventDefault();

    // Trello.authorize({
    //   type: 'redirect'
    // , success: function(){
    //     console.log('trello-auth', arguments);
    //     bus.emit('trello-auth');
    //   }

    // , error: function(){
    //     console.log('trello-error', arguments);
    //   }
    // , scope: { write: true, read: true }
    // });
  });
});