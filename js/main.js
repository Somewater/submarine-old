/**
 * @depend plugins.js
 */

/**
 * # CORE
 * @depend game/engine.js
 *
 * @depend game/submarine.js
 * @depend game/shark.js
 */

// You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
var renderer = PIXI.autoDetectRenderer(Math.min(800, window.innerWidth), Math.min(600, window.innerHeight));
document.body.appendChild(renderer.view);
requestAnimFrame(animate);
function animate() {
    Engine.tick();
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
var submarine = new Submarine();
submarine.setX(renderer.width / 2);
submarine.setY(renderer.height / 2);
Engine.addSObject(submarine);

for (var i = 0; i < 10; i++) {
    var shark = new Shark();
    shark.setX(renderer.width * Math.random());
    shark.setY(renderer.height * Math.random());
    Engine.addSObject(shark);
}