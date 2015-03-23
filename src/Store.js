var _ = require('./utils'),
    Reflux = require('./index'),
    ListenerMethods = require('./ListenerMethods'),
    allowed = {preEmit:1,shouldEmit:1},
    Keep = require('./Keep');


for(var a in Reflux.StoreMethods){
    if (!allowed[a] && (Reflux.PublisherMethods[a] || Reflux.ListenerMethods[a])){
        throw new Error("Cannot override API method " + a +
                        " in Reflux.StoreMethods. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead."
                       );
    }
}


function Store() {
    var i=0, arr;
    this.subscriptions = [];
    this.emitter = new _.EventEmitter();
    this.eventLabel = "change";

    if (this.init && _.isFunction(this.init)) {
        this.init();
    }
    if (this.listenables){
        arr = [].concat(this.listenables);
        for(;i < arr.length;i++){
            this.listenToMany(arr[i]);
        }
    }

    Keep.createdStores.push(this);
}


_.extend(Store.prototype, Reflux.ListenerMethods, Reflux.PublisherMethods, Reflux.StoreMethods);
console.log(Reflux, Reflux.PublisherMethods, ListenerMethods, Store.prototype.joinTrailing, Store.prototype)
module.exports = Store;
