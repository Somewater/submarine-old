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
var renderer = PIXI.autoDetectRenderer(Math.min(800, window.innerWidth), Math.min(600, window.innerHeight));
document.body.appendChild(renderer.view);
requestAnimFrame(animate);
function animate() {
    Engine.tick();
    renderer.render(Engine.stage);
    requestAnimFrame(animate);
    updateGui();
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

for (var i = 0; i < 30; i++) {
    var scoreItem = new ScoreItem();
    scoreItem.setX(renderer.width * Math.random());
    scoreItem.setY(renderer.height * Math.random());
    Engine.addSObject(scoreItem);
}

Engine.sound.play('sea_theme', -1);

var healthTablo = new PIXI.Text("", {font:"12px Arial", fill:"green"});
healthTablo.position.x = Engine.width - 100;
healthTablo.position.y = 5;
Engine.stage.addChild(healthTablo);

var scoreTablo = new PIXI.Text("", {font:"12px Arial", fill:"blue"});
scoreTablo.position.x = Engine.width - 100;
scoreTablo.position.y = 25;
Engine.stage.addChild(scoreTablo);

function updateGui(){
    // update gui
    if(submarine.health <= 0)
        healthTablo.setText('Submarine dead');
    else{
        healthTablo.setText('health\t' + Math.round(submarine.health) + '%');
        if(submarine.health < 40)
            healthTablo.setStyle({font: "12px Arial", fill: 'red'})
    }
    scoreTablo.setText('score\t' + digitize(submarine.score, 4));
}
function digitize(int, len){
    var result = int.toString();
    while(result.length < len)
        result = '0' + result;
    return result;
}