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

    var html = _.template(templateHtml, {
        profile_url: item.author[0].uri.$t
      , username: item.author[0].name.$t
      , video_url: item.link[0].href
      , video_name: item.title.$t
      , created_at: item.updated.$t
      , time_since: _.timesince(item.updated.$t)
      , entry_id: item.id.$t.substring(38)
      , desc: item['media$group']['media$description'].$t
    });

    return this.hideAndMakeYoutubeClickable(item, html);
  }

});