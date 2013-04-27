requirejs.config({
  paths: {
    'socialfeed': '../../../../socialfeed'
  }
});

require(['jquery', 'socialfeed'], function($, SocialFeed) {
  new SocialFeed($('#socialfeed'))
        .addModule(new SocialFeed.Modules.Github('mikaelbr'))
        .start();
});