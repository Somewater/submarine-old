AppConsole = new function(){
    this.visible = true;
    this.consoleDiv = null;
    this.commands = {}; // {callback, desc}
    this.history = []
    
    this.initialize = function(){
        this.loadCssFile();
        this.createConsole();
    }
    this.loadCssFile = function (){
        var fileref=document.createElement("style")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.innerHTML = '#sandbox,#sandbox pre.output,#sandbox pre.output span,#sandbox textarea,#sandbox textarea:focus{border:0 none;box-shadow:none;font-family:"Consolas","Andale Mono","Courier New","Courier",monospace;font-size:14px;font-weight:normal;line-height:1.3;outline:0 none}#sandbox{background:none repeat scroll 0 0 #333;border-radius:10px 10px 10px 10px;color:#ccc;margin:0 auto;width:600px;height:300px;padding:20px 20px 15px;position:absolute;top:0;left:0}#sandbox pre.output{border:0 none;display:block;height:285px;margin:0 0 10px;overflow-y:auto;padding:0;position:relative;white-space:pre;width:100%}#sandbox pre.output span{color:#f7f7f7}#sandbox pre.output span.command{color:#ccc}#sandbox pre.output span.prefix{color:#777}#sandbox pre.output span.undefined{color:#777}#sandbox pre.output span.string{color:#99f}#sandbox pre.output span.number{color:#7f7}#sandbox pre.output span.error{color:#f77}#sandbox .input{padding:0 0 0 15px;position:relative}#sandbox .input:before{color:#ddd;content:">";left:0;position:absolute;top:1px}#sandbox textarea{background:none repeat scroll 0 0 #333;border:0 none;color:#f7f7f7;margin:0;outline:0 none;overflow:hidden;padding:0;resize:none;width:100%}#sandbox textarea:focus{outline:0 none}';
        //fileref.setAttribute("href", '/css/sandbox.css')
        document.getElementsByTagName("head")[0].appendChild(fileref)
    }
    this.createConsole = function(){
        var self = this;
        var div =   '<div id="sandbox">' +
                        '<pre id="sandbox-output" class="output">' +
                        '</pre>' +
                        '<div class="input">' +
                            '<textarea id="sandbox-input" rows="1"></textarea>' +
                        '</div>' +
                    '</div>'
        this.consoleDiv = $(div);
        $('body').append(this.consoleDiv);
        $('#sandbox-input').keypress(function(event){
            if(event.keyCode == 13){// Enter
                var command = $(event.currentTarget).val().toString().replace(/\n/,'');
                if(command.length > 0){
                    $(event.currentTarget).val('')
                    self.stdin(command);
                }
            }
        })
    }
    this.toggle = function(on){
        if(on === undefined) on = !this.visible;
        this.visible = on;
        $('#sandbox').toggle(on);
    }
    this.print = function(msg, style, newline){
        if(!style) style = 'command';
        var elem = $('#sandbox-output');
        elem.append('<span class="' + style + '">' + msg + '</span>' + (newline ? '<br>' : ''));
        elem.scrollTop(elem[0].scrollHeight);
    }
    this.error = function(msg){this.print(msg, 'error', true);}
    this.log = function(msg){this.print(new Date().toLocaleTimeString() + '> ' + msg, undefined, true);}
    this.stdin = function(command){
        this.print(command, 'string', true);
        var args = command.split(/\s+/);
        var cmd = args.shift().toLowerCase();
        var result = '';
        var error = false;
        try{
            if(this.commands[cmd]){
                var cmdData = this.commands[cmd]
                result = cmdData.callback.apply(undefined, args)
            }else{
                result = eval(command);    
            }
        }catch (ex){
            error = true;
            this.error(ex.toString());
        }
        if(!error && result !== false) 
            this.stdout(result);
        this.history.push(command)
    }
    this.stdout = function(output){
        this.print('  =&gt; ', 'prefix');
        this.print(output, 'number', true);
    }
    this.addCommand = function(command, callback, desc){
        var cmdData = {callback: callback,desc: (desc || '')}
        this.commands[command] = cmdData
    }
    this.clear = function(){
        $('#sandbox-output').empty();
        return false
    }
    
}();
AppConsole.initialize();

AppConsole.addCommand('help', function(){
    var cmds = AppConsole.commands
    AppConsole.print('Available commands:', undefined, true)
    for(var cmdName in cmds){
        var cmd = cmds[cmdName];
        AppConsole.print('   ' + cmdName + (cmd.desc ? ' - ' + cmd.desc : ''), undefined, true);
    }
    return false
})
AppConsole.addCommand('clear', AppConsole.clear);
AppConsole.addCommand('history', function(){
    for (var i = 0; i < AppConsole.history.length; i++) {
        AppConsole.print(AppConsole.history[i], undefined, true)
    }
    return false
});