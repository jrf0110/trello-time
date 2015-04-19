module.exports = function( cards ){
  return ['card,elapsed'].concat(
    cards
      .sort( function( a, b ){
        return a.name > b.name;
      })
      .concat({
        name:   'Total'
      , timer:  require('../models/timer')({
                  elapsed:  cards.reduce( function( total, card ){
                              return total + card.timer.elapsed;
                            }, 0 )
                })
      })
      .map( function( card ){
        return [ card.name, card.timer.toString() ].join(',');
      })
  ).join('\n');
};