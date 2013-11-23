var SocialBase = require('../basemodule')
  , templateHtml = require('../resources').tumblr
  , _ = require('../utils')
  ;

module.exports = SocialBase.extend({
  init: function (url, apiKey) {
    this.blogUrl = url;
    this.apiKey = apiKey;
  }

  , url: function () {
    return 'http://api.tumblr.com/v2/blog/' + this.blogUrl + '/posts/text?api_key=' + this.apiKey;
  }

  , parse: function (resp) {
    if (!resp.meta || resp.meta.status !== 200) {
      return [];
    }
    return resp.response.posts || [];
  }

  , orderBy: function (item) {
    return -(new Date(item.date)).getTime();
  }

  , render: function (item) {
    item.time_since = _.timesince(item.date);
    return _.template(templateHtml, item);
  }
});