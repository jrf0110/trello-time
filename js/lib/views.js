var views = module.exports = [];

views.cleanup = function(){
  var view = views.pop();
  while ( view ){
    if ( typeof view.cleanup === 'function' ){
      view.cleanup();
    }

    view = views.pop();
  }
};