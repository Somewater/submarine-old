AppConsole = new function(){
    this.visible = true;
    this.consoleDiv = null;
    this.commands = {};
    
    this.initialize = function(){
        this.loadCssFile();
        this.createConsole();
    }
    this.loadCssFile = function (){
        var fileref=document.createElement("style")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        //fileref.innerHTML = ...
        fileref.setAttribute("href", '/css/sandbox.css')
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
        $('#sandbox-output').append('<span class="' + style + '">' + msg + '</span>' + (newline ? '<br>' : ''));
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
                this.commands[cmd].apply(undefined, args)
            }else{
                result = eval(command);    
            }
        }catch (ex){
            error = true;
            this.error(ex.toString());
        }
        if(!error) 
            this.stdout(result);
    }
    this.stdout = function(output){
        this.print('  =&gt; ', 'prefix');
        this.print(output, 'number', true);
    }
    
}();
AppConsole.initialize();