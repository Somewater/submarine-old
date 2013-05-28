Utils = new (function(){
    this.distance = function(p1, p2){
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    this.distanceSqr = function(p1, p2){
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        return dx * dx + dy * dy;
    }
    this.getPosition = function(event) {
        event = event.originalEvent ? event.originalEvent : event;
        var position = {x: null, y: null};
        if (Modernizr.touch) { //global variable detecting touch support
            if (event.touches && event.touches.length > 0) {
                position.x = event.touches[0].pageX - Const.offsetX;
                position.y = event.touches[0].pageY - Const.offsetY;
            }
        }else{
            position.x = event.pageX - Const.offsetX;
            position.y = event.pageY - Const.offsetY;
        }
        return position;
    }
    this.intersectsRect = function(rect1, rect2){
        var x1 = rect1.x;
        var y1 = rect1.y;
        var w1 = rect1.width;
        var h1 = rect1.height;
        var x2 = rect2.x;
        var y2 = rect2.y;
        var w2 = rect2.width;
        var h2 = rect2.height;
        if(w1 <= 0 || h1 <= 0 || w2 <= 0 || h2 <= 0) {
            return false;
        }
        return !!(x1 <= x2 + w2 && x2 <= x1 + w1 && y1 <= y2 + h2 && y2 <= y1 + h1);        
    } 
    this.digitize = function(integer, len){
        var result = integer.toString();
        while(result.length < len)
            result = '0' + result;
        return result;
    }
    this.pointsEquals = function(p1, p2){
        if(p1 == null)
            return p2 == null;
        else if(p2 == null)
            return false;
        return p1.x == p2.x && p1.y == p2.y;
    }
    this.remove = function(array, element){
        var idx = array.indexOf(element)
        if(idx != -1)
            array.splice(idx, 1);
    }
});
function trace(msg){
    console.debug(msg);
    if(typeof AppConsole != 'undefined')
        AppConsole.log(msg)
}