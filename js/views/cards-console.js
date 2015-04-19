module.exports = function( cards ){
  cards.sort( function( a, b ){
    return a.pos > b.pos;
  })
  .forEach( function( card ){
    console.log( card.name, card.timer.toString() );
  });

  var total = cards.reduce( function( total, card ){
    return total + card.timer.elapsed;
  }, 0 );

  console.log('');
  console.log( 'total', require('../models/timer')({ elapsed: total }).toString() );
};