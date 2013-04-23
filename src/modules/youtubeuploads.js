var SocialBase = require('../basemodule')
  , templateHtml = require('../resources').youtubeuploads
  , _ = require('../utils')
  ;

module.exports = SocialBase.extend({

  ajaxSettings: {
    cache: true,
    dataType: 'jsonp'
  }

  , init: function (ident, maxCount) {
    this.ident = ident;
    this.maxCount = maxCount || 10;
  }

  , url: function () {
    return 'http://gdata.youtube.com/feeds/users/' + this.ident + '/uploads?alt=json-in-script&format=5&max-results=' + this.maxCount;
  }

  , parse: function (resp) {
    var feed = resp.feed;
    return feed.entry || [];
  }

  , orderBy: function (item) {
    return -(new Date(item.updated.$t)).getTime();
  }

  , hideAndMakeYoutubeClickable: function (item, html) {

    var $html = $(html)
      , $iframe = $html.find('iframe')
      , thumbnail = item['media$group']['media$thumbnail'][0].url
      ;

    var $img = $('<img />', {
      src: thumbnail,
      'class': 'youtube-preview'
    }).insertAfter($iframe).on('click', function () {
      $iframe.insertAfter($img);
      $img.remove();
    });
    $iframe.remove();

    return $html;
  }

  , render: function (item) {

    var html = templateHtml
              .replace('{{profileurl}}', item.author[0].uri.$t)
              .replace('{{username}}', item.author[0].name.$t)
              .replace('{{videourl}}', item.link[0].href)
              .replace('{{videoname}}', item.title.$t)
              .replace('{{created_at}}', item.updated.$t)
              .replace('{{time_since}}', _.timesince(item.updated.$t))
              .replace('{{entryid}}', item.id.$t.substring(38))
              .replace('{{desc}}', item['media$group']['media$description'].$t);

    return this.hideAndMakeYoutubeClickable(item, html);
  }

});