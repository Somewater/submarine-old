function SmoothMover(instance){
    instance.fixx = 0
    instance.fixy = 0
    instance.viewx = 0
    instance.viewy = 0

    var superFromData = instance.fromData;
    instance.fromData = function(data){
        if(instance.x != SObject.INITIAL_COORD)
            instance.fixx = data.x - instance.viewx
        if(instance.y != SObject.INITIAL_COORD)
            instance.fixy = data.y - instance.viewy
        superFromData.call(instance, data)
    }

    instance.setX = function(x){
        if(instance.view)
            instance.view.position.x = instance.viewx = instance.smoothPosition(instance.view.position.x, x, instance.fixx, 'x');
        instance.x = x
    };
    instance.setY = function(y){
        if(instance.view)
            instance.view.position.y = instance.viewy = instance.smoothPosition(instance.view.position.y, y, instance.fixy, 'y');
        instance.y = y
    };
    instance.smoothPosition = function(current, actial, fix, name){
        if(fix == 0)
            return actial
        var fixAbs = (fix > 0 ? fix : -fix);
        
        if(/*fixAbs < instance.speed * 5 &&*/ fixAbs > 1){
            var fixPart = fix * 0.2
            instance['fix' + name] = fix - fixPart;
            return actial - fix + fixPart;
        }else{
            instance['fix' + name] = 0;
            return actial;
        }
    }
}