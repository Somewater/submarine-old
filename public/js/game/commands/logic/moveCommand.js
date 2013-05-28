function MoveCommand(sobject){
    Command.call(this, MoveCommand.ID);
    this.toData = function(){
        return {id: sobject.id, tx: sobject.targetPoint.x, ty: sobject.targetPoint.y}
    }
}
MoveCommand.ID = 'move'
Command.add(MoveCommand.ID, MoveCommand)

function MoveApplyCommand(){
    Command.call(this, MoveApplyCommand.ID);
    this.data = true
    this.execute = function(){
        var sobject = Engine.findSObject(this.data.id)
        if(sobject){
            if(sobject.targetPoint){
                sobject.targetPoint.x = this.data.tx;
                sobject.targetPoint.y = this.data.ty;
            }else
                sobject.targetPoint = new PIXI.Point(this.data.tx, this.data.ty)
        } else
            throw "moved sobject id=" + this.data.id + " not found"
    }
}
MoveApplyCommand.ID = 'move-apply'
Command.add(MoveApplyCommand.ID, MoveApplyCommand)