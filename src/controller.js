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
    var controller = this;

    this.modules.push(module);
    this.emit('moduleAdded', module);
    module.on('fetched', _.bind(controller.moduleFetched, controller));
    module.on('error', function () { 
      if (controller.listeners('error').length > 0) {
        controller.emit.apply(controller, ['error'].concat(arguments));
      }
      controller.moduleFetched();
    });
  }

  , start: function () {
    var controller = this;
    controller.emit('preFetch');
    controller.modules.forEach(function (module) {
      module.fetch();
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
    this._offset = 0;
    this.feedRendered = null;
    this.start();
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