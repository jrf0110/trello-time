var stampit = require('stampit');
var events  = require('events');
var moment  = require('moment');
var utils   = require('../lib/utils');

module.exports = stampit()
  .compose( stampit.convertConstructor( events.EventEmitter ) )
  .state({
    elapsed:        0
  , currStartDate:  null
  , hasStarted:     false
  })
  .enclose( function(){
    // Initialized with hasStarted, need to actually start
    if ( this.hasStarted ){
      this.start();
    }
  })
  .methods({
    start: function(){
      if ( this.isTicking() ) return this;

      this.hasStarted = true;
      this.currStartDate = new Date();

      this.tickInterval = setInterval( function(){
        this.captureElapsed();
        this.emit( 'tick', this );
      }.bind( this ), 1000 );

      return this;
    }

  , stop: function(){
      if ( !this.isTicking() ) return this;

      this.hasStarted = false;
      clearInterval( this.tickInterval );
      delete this.tickInterval;
      this.captureElapsed();

      return this;
    }

  , toggle: function(){
      return this[ this.isTicking() ? 'stop' : 'start' ]();
    }

  , captureElapsed: function(){
      this.elapsed += new Date() - this.currStartDate;
      this.currStartDate = new Date();
      return this;
    }

  , isTicking: function(){
      return this.hasStarted;
    }

  , toString: function(){
      var duration = moment.duration( this.elapsed, 'milliseconds' );

      return [
        utils.pad( duration.hours(), 2, '0' )
      , utils.pad( duration.minutes(), 2, '0' )
      , utils.pad( duration.seconds(), 2, '0' )
      ].join(':');
    }
  });