var EventEmitter = require('events').EventEmitter
  , _ = require('./utils')
  , inherits = require('util').inherits
  ;

var Controller = module.exports = function ($el) {
  this.modules = [];
  this.feedRendered = [];

  this.$el = $el || null;

  this.on('start', _.bind(this.start, this));
  this.on('reload', _.bind(this.reload, this));
  this.on('addModule', _.bind(this.addModule, this));
  this.on('synced', _.bind(this.render, this));
};
inherits(Controller, EventEmitter);

_.extend(Controller.prototype, {
  _sync_count: 0,

  addModule: function (module) {
    this.modules.push(module);
    this.emit('moduleAdded', module);
  }

  , start: function () {
    var controller = this;
    _.bindAll(controller);
    _.each(this.modules, function (module) {
      module.fetch();
      module.on('fetched', controller.moduleFetched);
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
    _.each(this.modules, function (module) {
      module.fetch();
    });
  }

  , render: function () {
    var $el = this.$el
      , list = this._generateOrderedList()
      ;

    _.each(list, function (item) {
      $el.append(item.html);
    });
    this.emit('rendered', list)
    return this;
  }

  , _generateOrderedList: function () {
    var list = [];
    _.each(this.modules, function (module) {
      var collectionlist = _.map(module.collection, function (item) {
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
    return _.sortBy(list, function (o) {
      return o.orderBy
    });
  }


});