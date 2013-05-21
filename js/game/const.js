Const = new (function(){
    this.basePath = "/"; // "http://example.com"
    this.imagePath = this.basePath + "img/";
    this.swfPath = this.basePath + "swf/";
    this.soundPath = this.basePath + "sound/";
    this.coordTreshold = 0.1;
    this.frictionCoef = 0.9;
    this.gestureZoneSqr = 100 * 100;
});