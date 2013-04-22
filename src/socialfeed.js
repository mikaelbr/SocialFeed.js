
var API = require('./api')
  , Controller = require('./controller')
  , SocialBase = require('./basemodule')
  , _ = require('./utils')
  , inherits = require('util').inherits
  ;

var SocialFeed = window.SocialFeed = function ($el) {
  if ( !(this instanceof SocialFeed) ) return new SocialFeed();
  this.c = new Controller($el);
};

inherits(SocialFeed, API);

// Make modules available:
window.SocialFeed.Modules = {
    Disqus: require('./modules/disqus')
  , Github: require('./modules/github')
  , Delicious: require('./modules/delicious')
  , SocialBase: SocialBase
  , extend: function (module) {
    return SocialBase.extend(module);
  }
};