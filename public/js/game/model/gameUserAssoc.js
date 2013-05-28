function GameUserAssoc(instance){
    instance.gameUser = null;
    var superToData = instance.toData
    var superFromData = instance.fromData
    instance.toData = function(){
        var data = superToData.call(instance)
        data.gameUserId = instance.gameUser.uid
        return data
    }
    instance.fromData = function(data){
        superFromData.call(instance, data);
        if(!instance.gameUser){
            var gameUserId = data.gameUserId
            instance.gameUser = Model.room.findUserById(gameUserId)
        }
    }
}