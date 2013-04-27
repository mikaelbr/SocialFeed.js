
var API = require('./api')
  , Controller = require('./controller')
  , SocialBase = require('./basemodule')
  , _ = require('./utils')
  ;

var SocialFeed = function (options) {
  if ( !(this instanceof SocialFeed) ) return new SocialFeed();
  if (!options.el) {
    options = {
      el: options
    };
  }
  this.c = new Controller(options);
};
// Expose public API.
_.inherits(SocialFeed, API);

// Make modules available:
SocialFeed.Modules = {
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

// Add SocialFeed to either the root (window, or as AMD).
(function (root) {
  if ( typeof define === "function" && define.amd ) {
    define( ["jquery"], function ( $ ) {
      SocialBase.$ = $;
      return SocialFeed;
    } );
  } else {
    // Browser globals
    this.SocialFeed = SocialFeed;
  }
})(this);