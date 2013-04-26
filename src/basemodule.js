var EventEmitter = require('events').EventEmitter
  , _ = require('./utils')
  ;

// imports as global..
require('./vendor/jquery-jsonp')

var SocialBase = module.exports = function () {
  this.collection = [];
  this.init.apply(this, arguments);

  this.$ = root.jQuery || root.Zepto || root.$;
  if (!this.$) throw "jQuery or Zepto is required to use SocialFeed.";
};
_.inherits(SocialBase, EventEmitter);

/** 
  Extend from Backbone 
  (Copyright (c) 2010-2013 Jeremy Ashkenas, DocumentCloud)
*/
SocialBase.extend = function (protoProps) {
  var parent = this
    , child = function(){ 
        return parent.apply(this, arguments); 
      }
    ;

  _.extend(child, parent);

  var Surrogate = function () { 
    this.constructor = child; 
  };

  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate;
  if (protoProps) {
    _.extend(child.prototype, protoProps);
  }
  child.__super__ = parent.prototype;

  return child;
};
/** // From Backbone */

SocialBase.fetch = function (options) {
  var jsonp = $.jsonp;
  if (options.dataType.toLowerCase() === 'jsonp' && jsonp) {
    options.callbackParameter = options.callbackParameter || "callback";
    return jsonp(options);
  }
  return $.ajax(options);
};

var root = window;

_.extend(SocialBase.prototype, {

  ajaxSettings: {
    dataType: 'jsonp',
    type: 'GET'
  }

  , init: function (ident) { 
    this.ident = ident;
  }
  
  , fetch: function (options) {
    options = options ? _.clone(options) : {};

    var url = _.result(this, 'url')
      , module = this
      , success = options.success
      ;

    options.url = url;
    options.success = function(resp) {
      var parsed = module.parse(resp);

      module.collection = parsed;
      if (success) success(module, parsed, options);
      module.emit('fetched', module, parsed, options);
    };

    var error = options.error;
    options.error = function(xOptions, textStatus) {
      if (error) error(module, textStatus, xOptions);
      module.emit('error', module, textStatus, xOptions);
    };

    if (!url && this.data) {
      options.success(_.result(this, 'data'));
      return void 0;
    }

    return SocialBase.fetch(_.extend(this.ajaxSettings, options));
  }

  , parse: function (resp) { 
    return resp;
  }

  , orderBy: function (item) {  }

  , render: function (item) {  }

});