function TargetPoint(instance){
    instance.targetPoint = null;
    var superToData = instance.toData
    var superFromData = instance.fromData
    instance.toData = function(){
        var data = superToData.call(instance)
        if(instance.targetPoint){
            data.tx = instance.targetPoint.x;
            data.ty = instance.targetPoint.y;
        }else{
            data.tx = data.ty = null;
        }
        return data
    }
    instance.fromData = function(data){
        superFromData.call(instance, data);
        if(this.gameUser && this.gameUser.itsMe())
            return;
        if(data.tx == null || data.ty == null){
            instance.targetPoint = null;
        }else{
            if(!instance.targetPoint)
                instance.targetPoint = new PIXI.Point();
            instance.targetPoint.x = data.tx;
            instance.targetPoint.y = data.ty;
        }
    }    
}