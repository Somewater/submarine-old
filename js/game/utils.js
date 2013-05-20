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
});

var traceDiv = $('<div style="position: absolute; width: 400px;"></div>');
var traceDivSwitcher = $('<div style="position: absolute; width: 20px; height: 20px; background: blue;"></div>');
$('body').append(traceDiv);
$('body').append(traceDivSwitcher);
$(traceDiv).on('selectstart dragstart', function(evt){ evt.preventDefault(); return false; });
$(traceDivSwitcher).click(function(){
    $(traceDiv).toggle();
});
function trace(msg){
    traceDiv.html(traceDiv.html() + (new Date().toLocaleTimeString()) + "> " + msg.toString() + "<br>");
}
trace("Console started");
$(traceDiv).toggle();