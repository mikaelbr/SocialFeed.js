var SocialBase = require('../basemodule')
  , templateHtml = require('../resources').disqus
  , _ = require('../utils')
  ;

module.exports = SocialBase.extend({

  init: function(ident, apikey) {
    this.ident = ident;
    this.apikey = apikey;
  }

  , url: function () {
    return 'https://disqus.com/api/3.0/users/listPosts.json?api_key=' + this.apikey + '&user:username=' + this.ident;
  }

  , parse: function (resp) {
    return resp.response;
  }

  , orderBy: function (item) {
    return -(new Date(item.createdAt)).getTime();
  }

  , render: function (item) {
    return _.template(templateHtml, {
      profile_url: item.author.profileUrl,
      author_name: item.author.name,
      created_at: item.createdAt,
      time_since: _.timesince(item.createdAt),
      message: item.message
    });
  }

});