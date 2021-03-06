/**
 * @depend plugins.js
 */

/**
 * # CORE
 * @depend game/core/engine.js
 *
 * @depend game/submarine.js
 * @depend game/shark.js
 * @depend game/scoreItem.js
 */

// You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
var renderer = PIXI.autoDetectRenderer(Const.width, Const.height);
document.body.appendChild(renderer.view);
$(function(){
    $(renderer.view).positionCenter();
    var pos = $(Engine.view).position()
    Const.offsetX = pos.left
    Const.offsetY = pos.top
});
requestAnimFrame(animate);
function animate() {
    Engine.ticker.globalTick();
    renderer.render(Engine.stage);
    requestAnimFrame(animate);
}
//setInterval(function(){
//    Engine.tick();
//}, 200);

///////////////////
//               //
//  GAME LOGIC   //
//               //
///////////////////

Engine.initialize(renderer);
GameController.initialize();
GuiController.initialize();

Engine.input.bind(192, function(){// tilda
    if(typeof AppConsole === 'undefined'){
        var script = document.createElement('script');
        script.src = '/js/game/console/inject.js';
        script.type = 'text/javascript';
        document.body.appendChild(script)
    } else {
        AppConsole.toggle();
    }
});