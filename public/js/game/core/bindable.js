function Bindable(clazz){
    clazz.$bindedCallbacks = {};
    clazz.$bindedOnceCallbacks = {};
    
    clazz.bind = function(code, callback, self){
        if(!clazz.$bindedCallbacks[code])
            clazz.$bindedCallbacks[code] = []
        clazz.$bindedCallbacks[code].push({callback: callback, self: self});
    }
    clazz.bindOnce = function(code, callback, self){
        if(!clazz.$bindedOnceCallbacks[code])
            clazz.$bindedOnceCallbacks[code] = []
        clazz.$bindedOnceCallbacks[code].push({callback: callback, self: self});
    }
    clazz.on = clazz.bind
    clazz.onOnce = clazz.bindOnce
    clazz.unbind = function(code, callback){
        var byCode = clazz.$bindedCallbacks[code]
        if(byCode){
            for(var idx in byCode){
                var data = byCode[idx]
                if(data.callback == callback){
                    byCode.splice(idx, 1);
                    if(byCode.length == 0)
                        delete clazz.$bindedCallbacks[code];    
                }
            }
        }
    }
    clazz.dispatch = function(code){
        var listened = clazz.$bindedCallbacks[code];
        var args;
        if(listened){
            args = Array.prototype.slice.call(arguments);
            args.shift();
            for (var i = 0; i < listened.length; i++)
                listened[i].callback.apply(listened[i].self, args);
        }
        listened = clazz.$bindedOnceCallbacks[code];
        delete clazz.$bindedOnceCallbacks[code];
        if(listened){
            if(!args){
                args = Array.prototype.slice.call(arguments);
                args.shift();
            }
            for (var i = 0; i < listened.length; i++)
                listened[i].callback.apply(listened[i].self, args);
        }
    }
}