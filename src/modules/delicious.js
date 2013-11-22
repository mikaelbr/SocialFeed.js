var SocialBase = require('../basemodule')
  , templateHtml = require('../resources').delicious
  , _ = require('../utils')
  ;

module.exports = SocialBase.extend({

  url: function () {
    return 'http://feeds.delicious.com/v2/json/' + this.ident;
  }

  , orderBy: function (item) {
    return -(new Date(item.dt)).getTime();
  }

  , render: function (item) {
    item.time_since = _.timesince(item.dt);
    return _.template(templateHtml, item)
  }

});