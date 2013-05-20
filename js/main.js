// You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
var renderer = PIXI.autoDetectRenderer(800, 600);
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