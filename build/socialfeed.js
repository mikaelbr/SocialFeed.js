require=(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({"jquery":[function(require,module,exports){
module.exports=require('O7kHmp');
},{}],"O7kHmp":[function(require,module,exports){
(function(global){(function browserifyShim(module, define, browserify_shim__define__module__export__) {
// jquery.jsonp 2.4.0 (c)2012 Julian Aubourg | MIT License
// https://github.com/jaubourg/jquery-jsonp
(function(e){function t(){}function n(e){C=[e]}function r(e,t,n){return e&&e.apply&&e.apply(t.context||t,n)}function i(e){return/\?/.test(e)?"&":"?"}function O(c){function Y(e){z++||(W(),j&&(T[I]={s:[e]}),D&&(e=D.apply(c,[e])),r(O,c,[e,b,c]),r(_,c,[c,b]))}function Z(e){z++||(W(),j&&e!=w&&(T[I]=e),r(M,c,[c,e]),r(_,c,[c,e]))}c=e.extend({},k,c);var O=c.success,M=c.error,_=c.complete,D=c.dataFilter,P=c.callbackParameter,H=c.callback,B=c.cache,j=c.pageCache,F=c.charset,I=c.url,q=c.data,R=c.timeout,U,z=0,W=t,X,V,J,K,Q,G;return S&&S(function(e){e.done(O).fail(M),O=e.resolve,M=e.reject}).promise(c),c.abort=function(){!(z++)&&W()},r(c.beforeSend,c,[c])===!1||z?c:(I=I||u,q=q?typeof q=="string"?q:e.param(q,c.traditional):u,I+=q?i(I)+q:u,P&&(I+=i(I)+encodeURIComponent(P)+"=?"),!B&&!j&&(I+=i(I)+"_"+(new Date).getTime()+"="),I=I.replace(/=\?(&|$)/,"="+H+"$1"),j&&(U=T[I])?U.s?Y(U.s[0]):Z(U):(E[H]=n,K=e(y)[0],K.id=l+N++,F&&(K[o]=F),L&&L.version()<11.6?(Q=e(y)[0]).text="document.getElementById('"+K.id+"')."+p+"()":K[s]=s,A&&(K.htmlFor=K.id,K.event=h),K[d]=K[p]=K[v]=function(e){if(!K[m]||!/i/.test(K[m])){try{K[h]&&K[h]()}catch(t){}e=C,C=0,e?Y(e[0]):Z(a)}},K.src=I,W=function(e){G&&clearTimeout(G),K[v]=K[d]=K[p]=null,x[g](K),Q&&x[g](Q)},x[f](K,J=x.firstChild),Q&&x[f](Q,J),G=R>0&&setTimeout(function(){Z(w)},R)),c)}var s="async",o="charset",u="",a="error",f="insertBefore",l="_jqjsp",c="on",h=c+"click",p=c+a,d=c+"load",v=c+"readystatechange",m="readyState",g="removeChild",y="<script>",b="success",w="timeout",E=window,S=e.Deferred,x=e("head")[0]||document.documentElement,T={},N=0,C,k={callback:l,url:location.href},L=E.opera,A=!!e("<div>").html("<!--[if IE]><i><![endif]-->").find("i").length;O.setup=function(t){e.extend(k,t)},e.jsonp=O})(jQuery)
; browserify_shim__define__module__export__(typeof $.jsonp != "undefined" ? $.jsonp : window.$.jsonp);

}).call(global, undefined, undefined, function defineExport(ex) { module.exports = ex; });

})(window)
},{}],1:[function(require,module,exports){

var API = require('./api')
  , Controller = require('./controller')
  , SocialBase = require('./basemodule')
  , _ = require('./utils')
  ;

var SocialFeed = window.SocialFeed = function (options) {
  if ( !(this instanceof SocialFeed) ) return new SocialFeed();
  if (!options.el) {
    options = {
      el: options
    };
  }
  this.c = new Controller(options);
};

_.inherits(SocialFeed, API);

// Make modules available:
window.SocialFeed.Modules = {
    Disqus: require('./modules/disqus')
  , Github: require('./modules/github')
  , YouTubeUploads: require('./modules/youtubeuploads')
  , Delicious: require('./modules/delicious')
  , SocialBase: SocialBase
  , extend: function (module) {
    return SocialBase.extend(module);
  }
};
},{"./api":2,"./basemodule":3,"./controller":4,"./utils":5,"./modules/disqus":6,"./modules/github":7,"./modules/youtubeuploads":8,"./modules/delicious":9}],2:[function(require,module,exports){
var API = module.exports = function (controller) {
};

API.prototype = {

  start: function () {
    this.c.emit('start');
    return this;
  }

  , reload: function () {
    this.c.emit('reload');
    return this;
  }

  , addModule: function (module) {
    this.c.emit('addModule', module);
    return this;
  }

  , nextBulk: function (page) {
    this.c.emit('nextBulk');
    return this;
  }

  , loadNumEntries: function (num) {
    this.c.emit('loadNumEntries', num);
    return this;
  }

  , on: function (eventType, cb) {
    this.c.on(eventType, cb);
    return this;
  }

};
},{}],5:[function(require,module,exports){

exports.timesince = function (date) {
  date = new Date(date);
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

var isFunc = exports.isFunc = function (obj) {
  return Object.prototype.toString.call(obj) == '[object Function]';
};

exports.result = function (object, property) {
  if (object == null) return;
  var value = object[property];
  return isFunc(value) ? value.call(object) : value;
};

exports.bind = function( fn, context ) {
  var args = [].slice.call( arguments, 2 );
  return function() {
    return fn.apply( context || this, args.concat( [].slice.call( arguments ) ) );
  };
};

exports.has = function (object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

exports.extend = function (obj) {
  [].slice.call(arguments, 1).forEach(function(source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};


// From Node util lib

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

},{}],10:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],11:[function(require,module,exports){
(function(process){if (!process.EventEmitter) process.EventEmitter = function () {};

var EventEmitter = exports.EventEmitter = process.EventEmitter;
var isArray = typeof Array.isArray === 'function'
    ? Array.isArray
    : function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]'
    }
;
function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (x === xs[i]) return i;
    }
    return -1;
}

// By default EventEmitters will print a warning if more than
// 10 listeners are added to it. This is a useful default which
// helps finding memory leaks.
//
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
var defaultMaxListeners = 10;
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!this._events) this._events = {};
  this._events.maxListeners = n;
};


EventEmitter.prototype.emit = function(type) {
  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events || !this._events.error ||
        (isArray(this._events.error) && !this._events.error.length))
    {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }
  }

  if (!this._events) return false;
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;

  } else {
    return false;
  }
};

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
EventEmitter.prototype.addListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('addListener only takes instances of Function');
  }

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this.emit('newListener', type, listener);

  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  } else if (isArray(this._events[type])) {

    // Check for listener leak
    if (!this._events[type].warned) {
      var m;
      if (this._events.maxListeners !== undefined) {
        m = this._events.maxListeners;
      } else {
        m = defaultMaxListeners;
      }

      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        console.trace();
      }
    }

    // If we've already got an array, just append.
    this._events[type].push(listener);
  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  var self = this;
  self.on(type, function g() {
    self.removeListener(type, g);
    listener.apply(this, arguments);
  });

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('removeListener only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events || !this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var i = indexOf(list, listener);
    if (i < 0) return this;
    list.splice(i, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (this._events[type] === listener) {
    delete this._events[type];
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
    return this;
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
};

EventEmitter.prototype.listeners = function(type) {
  if (!this._events) this._events = {};
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
};

})(require("__browserify_process"))
},{"__browserify_process":10}],3:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter
  , _ = require('./utils')
  , jsonp = require('./vendor/jquery-jsonp')
  ;

var SocialBase = module.exports = function () {
  this.collection = [];
  this.init.apply(this, arguments);
};
_.inherits(SocialBase, EventEmitter);

SocialBase.extend = function (protoProps, staticProps) {
  var parent = this;
  var child;

  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent's constructor.
  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function(){ return parent.apply(this, arguments); };
  }

  // Add static properties to the constructor function, if supplied.
  _.extend(child, parent, staticProps);

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function.
  var Surrogate = function(){ this.constructor = child; };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate;

  // Add prototype properties (instance properties) to the subclass,
  // if supplied.
  if (protoProps) _.extend(child.prototype, protoProps);

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;

  return child;
};

SocialBase.fetch = function (options) {
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

    this.$ = root.jQuery || root.Zepto || root.ender || root.$;

    if (!this.$) throw "jQuery, Zepto or Ender is required to use SocialFeed.";
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

    return SocialBase.fetch(_.extend(this.ajaxSettings, options));
  }

  , parse: function (resp) { 
    return resp;
  }

  , orderBy: function (item) {  }

  , render: function (item) {  }

});
},{"events":11,"./vendor/jquery-jsonp":"O7kHmp","./utils":5}],6:[function(require,module,exports){
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
    return templateHtml
                      .replace('{{author.profileUrl}}', item.author.profileUrl)
                      .replace('{{author.name}}', item.author.name)
                      .replace('{{createdAt}}', item.createdAt)
                      .replace('{{time_since}}', _.timesince(item.createdAt))
                      .replace('{{message}}', item.message);
                   
    return $html;
  }

});
},{"../basemodule":3,"../resources":12,"../utils":5}],8:[function(require,module,exports){
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
},{"../basemodule":3,"../resources":12,"../utils":5}],4:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter
  , _ = require('./utils')
  ;

var Controller = module.exports = function (options) {
  this.modules = [];
  this.feedRendered = null;

  this.$el = options.el || null;
  this.count = options.count || 1000;
  this._offset = options.offset || 0;

  this.on('start', _.bind(this.start, this));
  this.on('reload', _.bind(this.reload));
  this.on('addModule', _.bind(this.addModule));
  this.on('postFetch', _.bind(this.render));

  // Paging
  this.on('nextBulk', _.bind(this.nextBulk));
  this.on('loadNumEntries', _.bind(this.loadNumEntries));
};
_.inherits(Controller, EventEmitter);

_.extend(Controller.prototype, {
  _sync_count: 0

  , addModule: function (module) {
    this.modules.push(module);
    this.emit('moduleAdded', module);
  }

  , start: function () {
    var controller = this;
    controller.emit('preFetch');
    controller.modules.forEach(function (module) {
      module.fetch();
      module.on('fetched', _.bind(controller.moduleFetched, controller));
      module.on('error', function () { 
        if (controller.listeners('error').length > 0) {
          controller.emit.apply(controller, ['error'].concat(arguments));
        }
        controller.moduleFetched();
      });
    });
  }

  , moduleFetched: function (a, b, c) {
    if (++this._sync_count === this.modules.length) {
      // all done
      this.emit('postFetch', this.modules);
      this._sync_count = 0;
    }
  }

  , reload: function () {
    this.$el.empty();
    this._offset = 1;
    this.feedRendered = null;
    this.emit('preFetch');
    this.modules.forEach(function (module) {
      module.fetch();
    });
  }

  , nextBulk: function () {
    return this.loadNumEntries(this.count);
  }

  , loadNumEntries: function (num) {
    if (this._offset >= this.feedRendered.length) {
      return this;
    }
    var tmp = this.count;
    this.count = num;
    this.render();
    this.count = tmp;
    return this;
  }

  , render: function () {
    var $el = this.$el;

    if (this.feedRendered === null) {
      this.feedRendered = this._generateOrderedList();
      this.emit('dataReady', this.feedRendered, this.modules);
    }

    var list = this.feedRendered.slice(this._offset, (this._offset + this.count));
    list.forEach(function (item) {
      $el.append(item.html);
    });
    this._offset += this.count;

    this.emit('rendered', list);
    return this;
  }

  , _generateOrderedList: function () {
    var list = [];
    this.modules.forEach(function (module) {
      var collectionlist = module.collection.map(function (item) {
        var html = module.render(item);
        if (!html) {
          return null;
        }

        return {
          orderBy: module.orderBy(item),
          html: html
        };
      });
      collectionlist = collectionlist.filter(function (item) {
        return item !== null;
      });
      list = list.concat(collectionlist);
    });

    return this._orderList(list);
  }

  , _orderList: function (list) {
    return list.sort(function (x, y) {
      var a = x.orderBy;
      var b = y.orderBy;
      if (a > b || a === void 0) return 1;
      if (a <= b || b === void 0) return -1;
    });
  }


});
},{"events":11,"./utils":5}],7:[function(require,module,exports){
var SocialBase = require('../basemodule')
  , resources = require('../resources')
  , _ = require('../utils')
  , tmpl = {
    create: resources.github_create,
    createbranch: resources.github_createbranch,
    watch: resources.github_watch,
    push: resources.github_push,
    pullrequest: resources.github_pullrequest,
    fork: resources.github_fork,
    issue: resources.github_issue
  };

var getRepoURL = function (item) {
  return 'https://github.com/' + item.repo.name;
}
, getUserURL = function (item) {
  return 'https://github.com/' + item.actor.login;
}
, templateHelper = function (template, item) {
  return tmpl[template]
            .replace('{{profileUrl}}', getUserURL(item))
            .replace('{{username}}', item.actor.login)
            .replace('{{reponame}}', item.repo.name)
            .replace('{{repourl}}', getRepoURL(item))
            .replace('{{time_since}}', _.timesince(item.created_at))
            .replace('{{created_at}}', item.created_at);
}
;

var defaultVisibility = {
    'CreateEvent': true
  , 'WatchEvent': true
  , 'PushEvent': true
  , 'PullRequestEvent': true
  , 'ForkEvent': true
  , 'IssuesEvent': true
};

module.exports = SocialBase.extend({
  init: function (ident, showEntities) {
    this.ident = ident;
    this.show = _.extend(defaultVisibility, showEntities);
  }

  , url: function () {
    return 'https://api.github.com/users/' + this.ident + '/events';
  }

  , orderBy: function (item) {
    return -(new Date(item.created_at)).getTime();
  }

  , renderMethods: {
    'CreateEvent': function (item) {

      if (item.payload.ref === null) {
        return templateHelper('create', item);
      }

      return templateHelper('createbranch', item)
                .replace('{{branchurl}}', getRepoURL(item) + '/tree/' + item.payload.ref)
                .replace('{{branchname}}', item.payload.ref);
    }

    , 'WatchEvent': function (item) {
      return templateHelper('watch', item);
    }

    , 'PushEvent': function (item) {
      var $html = $(templateHelper('push', item));

      // Add commits: 
      var $ul = $html.find('.socialfeed-commit-list')
        , $li = $ul.find('li:first');

      item.payload.commits.forEach(function(commit) {
        var $it = $li.clone();

        $it.find('a')
          .attr('href', getRepoURL(item) + '/commit/' + commit.sha)
          .text(commit.sha.substr(0, 7));
        $it.find('span').text(commit.message);
        $ul.prepend($it);
      });
      $li.remove();
      return $html;
    }

    , 'PullRequestEvent': function (item) {
      return templateHelper('pullrequest', item)
                .replace('{{action}}', item.payload.action)
                .replace('{{title}}', item.payload.pull_request.title)
                .replace('{{pullrequesturl}}', item.payload.pull_request.html_url)
                .replace('{{pullrequestname}}', item.repo.name + '#' + item.payload.number);
    }

    , 'ForkEvent': function (item) {
      return templateHelper('fork', item)
                .replace('{{forkeeurl}}', item.payload.forkee.html_url)
                .replace('{{forkeename}}', item.payload.forkee.full_name);
    }

    , 'IssuesEvent': function (item) {
      return templateHelper('issue', item)
                .replace('{{action}}', item.payload.action)
                .replace('{{title}}', item.payload.issue.title)
                .replace('{{issueurl}}', item.payload.issue.html_url)
                .replace('{{issuename}}', item.repo.name + '#' + item.payload.number);
    }
  }

  , parse: function (resp) {
    return resp.data;
  }

  , render: function (item) {
    if (item.type && this.renderMethods[item.type] && !!this.show[item.type]) {
      return this.renderMethods[item.type].apply(this, [item]);
    } 

    return null;
  }

});
},{"../basemodule":3,"../resources":12,"../utils":5}],9:[function(require,module,exports){
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
},{"../basemodule":3,"../resources":12,"../utils":5}],12:[function(require,module,exports){
/* Do not alter. Auto generated file */

module.exports = {
	"delicious": "<div class=\"socialfeed-item socialfeed-delicious\">\n  <i class=\"socialfeed-icon icon-link\"></i>\n  <header>\n    <h2><a href=\"{{u}}\">{{d}}</a></h2>\n    <time datetime=\"{{dt}}\">{{time_since}}</time>\n  </header>\n  <div class=\"socialfeed-body\">\n    {{n}}\n  </div>\n</div>",
	"disqus": "<div class=\"socialfeed-item socialfeed-disqus\">\n  <i class=\"socialfeed-icon icon-comment-alt\"></i>\n  <header>\n    <h2><a href=\"{{author.profileUrl}}\">{{author.name}}</a></h2>\n    <time datetime=\"{{createdAt}}\">{{time_since}}</time>\n  </header>\n  <div class=\"socialfeed-body\">\n    {{message}}\n  </div>\n</div>",
	"github_create": "<div class=\"socialfeed-item socialfeed-github socialfeed-github-create\">\n  <i class=\"socialfeed-icon icon-github\"></i>\n  <header>\n    <h2>\n      <a href=\"{{profileUrl}}\">{{username}}</a> created repository <a href=\"{{repourl}}\">{{reponame}}</a>\n    </h2>\n    <time datetime=\"{{created_at}}\">{{time_since}}</time>\n  </header>\n</div>",
	"github_createbranch": "<div class=\"socialfeed-item socialfeed-github socialfeed-github-createbranch\">\n  <i class=\"socialfeed-icon icon-github\"></i>\n  <header>\n    <h2>\n      <a href=\"{{profileUrl}}\">{{username}}</a> \n      created branch <a href=\"{{branchurl}}\">{{branchname}}</a> \n      at <a href=\"{{repourl}}\">{{reponame}}</a></h2>\n    <time datetime=\"{{created_at}}\">{{time_since}}</time>\n  </header>\n</div>",
	"github_fork": "<div class=\"socialfeed-item socialfeed-github socialfeed-github-fork\">\n  <i class=\"socialfeed-icon icon-github\"></i>\n  <header>\n    <h2>\n      <a href=\"{{profileUrl}}\">{{username}}</a> \n      forked repository <a href=\"{{repourl}}\">{{reponame}}</a>\n      to <a href=\"{{forkeeurl}}\">{{forkeename}}</a>\n    </h2>\n    <time datetime=\"{{created_at}}\">{{time_since}}</time>\n  </header>\n</div>",
	"github_issue": "<div class=\"socialfeed-item socialfeed-github socialfeed-github-issue\">\n  <i class=\"socialfeed-icon icon-github\"></i>\n  <header>\n    <h2>\n      <a href=\"{{profileUrl}}\">{{username}}</a> \n      {{action}} issue <a href=\"{{issueurl}}\">{{issuename}}</a>\n    </h2>\n    <time datetime=\"{{created_at}}\">{{time_since}}</time>\n  </header>\n  <div class=\"socialfeed-body\">\n    {{title}}\n  </div>\n</div>",
	"github_pullrequest": "<div class=\"socialfeed-item socialfeed-github socialfeed-github-pull-request\">\n  <i class=\"socialfeed-icon icon-github\"></i>\n  <header>\n    <h2>\n      <a href=\"{{profileUrl}}\">{{username}}</a> \n      {{action}} pull request <a href=\"{{pullrequesturl}}\">{{pullrequestname}}</a>\n    </h2>\n    <time datetime=\"{{created_at}}\">{{time_since}}</time>\n  </header>\n  <div class=\"socialfeed-body\">\n    {{title}}\n  </div>\n</div>",
	"github_push": "<div class=\"socialfeed-item socialfeed-github socialfeed-github-push\">\n  <i class=\"socialfeed-icon icon-github\"></i>\n  <header>\n    <h2>\n      <a href=\"{{profileUrl}}\">{{username}}</a> \n      pushed to <a href=\"{{repourl}}\">{{reponame}}</a>\n    </h2>\n    <time datetime=\"{{created_at}}\">{{time_since}}</time>\n  </header>\n  <ul class=\"socialfeed-commit-list\">\n    <li>\n      <a href=\"{{commiturl}}\">{{commit}}</a>\n      <span>{{commit_message}}</span>\n    </li>\n  </ul>\n</div>",
	"github_watch": "<div class=\"socialfeed-item socialfeed-github socialfeed-github-watch\">\n  <i class=\"socialfeed-icon icon-github\"></i>\n  <header>\n    <h2><a href=\"{{profileUrl}}\">{{username}}</a> starred <a href=\"{{repourl}}\">{{reponame}}</a></h2>\n    <time datetime=\"{{created_at}}\">{{time_since}}</time>\n  </header>\n</div>",
	"youtubeuploads": "<div class=\"socialfeed-item socialfeed-youtube socialfeed-youtube-upload\">\n  <i class=\"socialfeed-icon icon-play-circle\"></i>\n  <header>\n    <h2><a href=\"{{profileurl}}\">{{username}}</a> added a video: <a href=\"{{videourl}}\">{{videoname}}</a></h2>\n    <time datetime=\"{{created_at}}\">{{time_since}}</time>\n  </header>\n  <div class=\"socialfeed-body\">\n    <iframe class=\"youtube-preview\"\n      src=\"http://www.youtube.com/embed/{{entryid}}?wmode=transparent&amp;HD=0&amp;rel=0&amp;showinfo=0&amp;controls=1&amp;autoplay=1\" \n      frameborder=\"0\" \n      allowfullscreen>\n    </iframe>\n    <p>{{desc}}</p>\n  </div>\n</div>",

};
},{}]},{},[1])
;