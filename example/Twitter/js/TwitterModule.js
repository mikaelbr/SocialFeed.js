// Twitter module
;(function (SocialFeed, root) {

  root.TwitterModule = SocialFeed.Modules.extend({
    url: function () {
      // Heroku host for node-serverside.js
      // ident is here is count.
      return 'http://mib-twitfeed.herokuapp.com/?count=' + (this.ident || 10)
    }

    , orderBy: function (item) {
      return -(new Date(item.created_at)).getTime();
    }

    , render: function (item) {
      var html = '<h2><a href="http://twitter.com/'+ item.user.screen_name+'">@'+item.user.screen_name+'</a> tweeted:</h2>';
      html += '<p>' + item.text + '</p>';
      return '<div class="socialfeed-item socialfeed-twitter"><i class="socialfeed-icon icon-twitter"></i>' + html + '</div>';
    }
  });

})(SocialFeed, window);