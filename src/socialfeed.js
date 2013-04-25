
var API = require('./api')
  , Controller = require('./controller')
  , SocialBase = require('./basemodule')
  , _ = require('./utils')
  ;

var SocialFeed = window.SocialFeed = function (options) {
  if ( !(this instanceof SocialFeed) ) return new SocialFeed();
  if (!options.el) {
    options = {
      el: options
    };
  }
  this.c = new Controller(options);
};

_.inherits(SocialFeed, API);

// Make modules available:
window.SocialFeed.Modules = {
    Disqus: require('./modules/disqus')
  , Github: require('./modules/github')
  , YouTubeUploads: require('./modules/youtubeuploads')
  , Delicious: require('./modules/delicious')
  , RSS: require('./modules/rss')
  , SocialBase: SocialBase
  , extend: function (module) {
    return SocialBase.extend(module);
  }
};