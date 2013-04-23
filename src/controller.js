var EventEmitter = require('events').EventEmitter
  , _ = require('./utils')
  ;

var Controller = module.exports = function ($el) {
  this.modules = [];
  this.feedRendered = [];

  this.$el = $el || null;

  this.on('start', _.bind(this.start, this));
  this.on('reload', _.bind(this.reload));
  this.on('addModule', _.bind(this.addModule));
  this.on('synced', _.bind(this.render));
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
    controller.modules.forEach(function (module) {
      module.fetch();
      module.on('fetched', _.bind(controller.moduleFetched, controller));
      module.on('error', function () { 
        controller.emit.apply(controller, ['error'].concat(arguments));
      });
    });
  }

  , moduleFetched: function (a, b, c) {
    if (++this._sync_count === this.modules.length) {
      // all done
      this.emit('synced');
      this.emit('postFetch', this.modules);
      this._sync_count = 0;
    }
  }

  , reload: function () {
    this.$el.empty();
    this.emit('preFetch');
    this.modules.forEach(function (module) {
      module.fetch();
    });
  }

  , render: function () {
    var $el = this.$el
      , list = this._generateOrderedList()
      ;

    list.forEach(function (item) {
      $el.append(item.html);
    });
    this.emit('rendered', list)
    return this;
  }

  , _generateOrderedList: function () {
    var list = [];
    this.modules.forEach(function (module) {
      var collectionlist = module.collection.map(function (item) {
        return {
          orderBy: module.orderBy(item),
          html: module.render(item)
        };
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