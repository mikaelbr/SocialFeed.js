
var API = require('./api')
  , Controller = require('./controller')
  , SocialBase = require('./basemodule')
  , _ = require('./utils')
  ;

var SocialFeed = window.SocialFeed = function ($el) {
  if ( !(this instanceof SocialFeed) ) return new SocialFeed();
  this.c = new Controller($el);
};

_.inherits(SocialFeed, API);

// Make modules available:
window.SocialFeed.Modules = {
    Disqus: require('./modules/disqus')
  , Github: require('./modules/github')
  , YouTubeUploads: require('./modules/youtubeuploads')
  , Delicious: require('./modules/delicious')
  , SocialBase: SocialBase
  , extend: function (module) {
    return SocialBase.extend(module);
  }
};