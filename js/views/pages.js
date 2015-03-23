var $ = require('jquery');
var _ = require('lodash');

var pages = module.exports = function( id, options ){
  pages[ id ] = Object.create(_.extend({
    init: function(){
      this.$el = $('#page-' + id);
      return this;
    }

  , activate: function(){
      $('.page').removeClass('active');
      this.$el.addClass('active');
      return this;
    }
  })).init();
};