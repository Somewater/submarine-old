function Bindable(clazz){
    clazz.$bindedCallbacks = {};
    clazz.bind = function(code, callback){
        if(!clazz.$bindedCallbacks[code])
            clazz.$bindedCallbacks[code] = []
        clazz.$bindedCallbacks[code].push(callback);
    }
    clazz.on = clazz.bind
    clazz.unbind = function(code, callback){
        if(clazz.$bindedCallbacks[code]){
            var idx = clazz.$bindedCallbacks[code].indexOf(callback);
            if(idx != -1){
                clazz.$bindedCallbacks[code].splice(idx, 1);
                if(clazz.$bindedCallbacks[code].length == 0)
                    delete clazz.$bindedCallbacks[code];
            }
        }
    }
    clazz.dispatch = function(code){
        var listened = clazz.$bindedCallbacks[code];
        if(listened){
            var args = Array.prototype.slice.call(arguments);
            args.slice().shift();
            for (var i = 0; i < listened.length; i++)
                listened[i].apply(undefined, args);
        }
    }
}