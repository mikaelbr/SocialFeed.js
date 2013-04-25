requirejs.config({
  paths: {
    'socialfeed': '../../../../socialfeed'
  },
  shim: {
    'socialfeed': {
      deps: ['jquery'],
      exports: 'SocialFeed'
    }
  }
});

require(['jquery', 'socialfeed'], function($, SocialFeed) {
  new SocialFeed($('#socialfeed'))
        .addModule(new SocialFeed.Modules.Github('mikaelbr'))
        .start();
});