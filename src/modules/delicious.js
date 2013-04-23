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
    return templateHtml
                  .replace('{{u}}', item.u)
                  .replace('{{d}}', item.d)
                  .replace('{{n}}', item.n)
                  .replace('{{dt}}', item.dt)
                  .replace('{{time_since}}', _.timesince(item.dt));
  }

});