module.exports.parseUrl = function(){
  var pathname = window.location.pathname;
  var parts = pathname.split('/');
  
  var result = {
    cardOpen: parts[1] === 'c'
  };

  if ( result.cardOpen ){
    result.cardId = parts[2];
    result.cardUrl = pathname;
  }

  return result;
};

module.exports.pad = function( num, n, padChar ){
  padChar = padChar || '0';
  num = '' + num;
  n -= num.length;
  return Array.apply( null, Array( n ) ).map( function(){
    return padChar;
  }) + num;
};