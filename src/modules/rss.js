var SocialBase = require('../basemodule')
  , templateHtml = require('../resources').rss
  , _ = require('../utils')
  ;

module.exports = SocialBase.extend({
  init: function (url, count) {
    this.feedURL = url;
    this.count = count || 10;
  }

  , url: function () {
    // Use Google API feed service.
    return 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + this.count + '&q=' + encodeURIComponent(this.feedURL);
  }

  , parse: function (resp) {
    var feed = resp.responseData.feed;
    if (!feed) {
      return [];
    }
    this.blogname = feed.title;
    this.blogurl = feed.link;
    return feed.entries || [];
  }

  , orderBy: function (item) {
    return -(new Date(item.publishedDate)).getTime();
  }

  , render: function (item) {
    return _.template(templateHtml, {
        "blog_name": this.blogname
      , "blog_url": this.blogurl
      , "url": item.link
      , "title": item.title
      , "date": item.publishedDate
      , "time_since": _.timesince(item.publishedDate)
    });
  }
});