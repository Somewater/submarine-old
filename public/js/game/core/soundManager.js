Engine.sound = new function(){
    this.soundManager2Ready = false;
    this.usingAudioFormat = 'ogg';
    this.deferredSounds = [];
    this.mute = Const.defaultSoundMute
    
    this.initialize = function(){
        var self = this;
        soundManager.setup({
            url: '/swf/',
            preferFlash: false,
            flashVersion: 9,
            debugMode: false,
            onready: function() {
                self.onSoundManager2Ready();
            }
        });
    };
    this.onSoundManager2Ready = function(){
        this.soundManager2Ready = true;
        if(!soundManager.html5['ogg'])
            this.usingAudioFormat = 'mp3';
        while (this.deferredSounds.length) {
            var c = this.deferredSounds.shift();
            if(c[0] == 'play')
                this.play.apply(this, c[1]);
            else
                throw new Error('Undefined function ' + c[0]);
        }
    }
    this.play = function(soundId, count){
        if(this.mute) 
            return
        if(!this.soundManager2Ready){
            this.deferredSounds.push(['play', arguments]);
            return false;
        }
        count = count || 1;
        if(!soundManager.getSoundById(soundId, true))
            soundManager.createSound({
                id: soundId,
                url: Const.soundPath + soundId + '.' + this.usingAudioFormat
            });
        var opts = {};
        if(count != 1) opts.loops = (count < 0 ? 0xFFFF : count)
        soundManager.play(soundId, opts)
        return true;
    }
};