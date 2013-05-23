var SocialBase = require('../basemodule')
  , resources = require('../resources')
  , _ = require('../utils')
  , tmpl = {
    like: resources.vimeo_like,
    add_comment: resources.vimeo_add_comment,
    upload: resources.vimeo_upload
  }
  , defaultVisibility = {
      'like': true
    , 'add_comment': true
    , 'upload': true
  }
  , templateHelper = function (template, item) {
    return tmpl[template]
              .replace('{{user_url}}', item.user_url)
              .replace('{{user_name}}', item.user_name)
              .replace('{{user_portrait}}', item.user_portrait_small)
              .replace('{{video_title}}', item.video_title)
              .replace(new RegExp('{{video_url}}', 'g'), item.video_url)
              .replace('{{video_thumbnail_large}}', item.video_thumbnail_large)
              .replace('{{user_portrait}}', item.user_portrait_small)
              .replace('{{time_since}}', _.timesince(item.date))
              .replace('{{created_at}}', item.date);
  }
  ;

module.exports = SocialBase.extend({

  ajaxSettings: {
    cache: true,
    dataType: 'jsonp'
  }

  , init: function (ident, showEntities) {
    this.ident = ident;
    this.show = _.extend(defaultVisibility, showEntities);
  }

  , url: function () {
    return 'http://vimeo.com/api/v2/activity/' + this.ident + '/user_did.json';
  }

  , orderBy: function (item) {
    return -(new Date(item.date)).getTime();
  }

  , renderMethods: {
    'like': function (item) {
      return templateHelper('like', item);
    }

    , 'add_comment': function (item) {
      return templateHelper('add_comment', item).replace('{{comment_text}}', item.comment_text);
    }
  
    , 'upload': function (item) {
      return templateHelper('upload', item);
    }
  }

  , render: function (item) {
    if (item.type && this.renderMethods[item.type] && !!this.show[item.type]) {
      return this.renderMethods[item.type].apply(this, [item]);
    } 

    return null;
  }

});