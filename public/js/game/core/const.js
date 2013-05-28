Const = new (function(){
    this.width = 800
    this.height = 600;
    this.basePath = "/"; // "http://example.com"
    this.imagePath = this.basePath + "img/";
    this.swfPath = this.basePath + "swf/";
    this.soundPath = this.basePath + "sound/";
    this.coordTreshold = 0.1;
    this.frictionCoef = 0.9;
    this.gestureZoneSqr = 100 * 100;
    this.attackTicks = 5;// сколько тиков длится одна атака (мин. расстояние между атаками)
    this.defaultSoundMute = false
});