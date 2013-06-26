package ;
import com.hellespontus.engine.core.CommandBase;
import haxe.io.BytesOutput;
import haxe.io.BytesInput;
import com.hellespontus.engine.core.ICommand;
import com.hellespontus.engine.core.IServer;
import com.hellespontus.engine.controller.ServerBase;
import com.hellespontus.engine.d2.SelectTargetCommand;
import com.hellespontus.engine.core.IWorld;
import com.hellespontus.engine.d2.Entity2D;
import com.hellespontus.engine.core.IUser;
import com.hellespontus.engine.core.IWorld;
import com.hellespontus.engine.controller.EngineControllerBase;
import com.hellespontus.engine.controller.Ticker;
import com.hellespontus.engine.core.World;
import com.hellespontus.engine.core.IEngine;
import com.hellespontus.engine.core.User;
import com.hellespontus.engine.d2.Entity2DRotated;
import haxe.Log;
import com.hellespontus.engine.d2.Engine;
@:expose class Test {

    public static var engine:IEngine;
    public static var ticker:Ticker;
    public static var server:Server;


    public function new() {
    }

    public static function main(){
        redirectTrace();
        engine = new Engine();
        for(i in 0...1000000){

        }
        trace("Hellespontus started, engine time=" + engine.time());

        World;
        Entity2DRotated;
        User;
        
        ticker = new Ticker();
        server = new Server(engine);
        new SubmarineEngineController(engine, ticker, server).start();
    }

    private static var defaultTrace:Dynamic;
    private static function redirectTrace():Void {
        var oldTrace = Log.trace;
        Log.trace = function(v, ?i) {
            js.Browser.window.console.log((i != null?i.fileName + ":" + i.lineNumber + ": ":"") + v);
            oldTrace(v, i);
        };
    }
}

class SubmarineEngineController extends EngineControllerBase{

    private var tickCounter:Int;

    override public function start():Void{
        tickCounter = 0;
        super.start();
    }

    override private function connectToServer():Void {
        trace('connect to server...');
        onEngineInitialized();
    }

    override public function setup():Void {
        engine.registerCommand(SelectTargetCommand.TYPE, SelectTargetCommand);
    
        var u:IUser = engine.createUser();
        engine.user = u;
    
        var w:IWorld = new World(0);
        
        var i:Entity2D = cast(engine.createEntity(u), Entity2D);
        i.x = 5;
        i.y = 5;
        i.vx = 0.06;
        i.vy = 0.01;
        i.ax = -0.00000001;
        i.ay = -0.00000002;
        w.add(i);        
        
        engine.addState(w);
        
    }

    override private function tick(?delta:Int):Void {
        var w:IWorld = engine.world();
        if(tickCounter % 30 == 0)
            trace(w);
        engine.addState(w);
        tickCounter++;
    }
}

class Server extends ServerBase{

    public function new(commandRegister:ICommandRegister){
        super(new WorldTranslatorBytes(), new CommandTranslatorBytes(commandRegister));
    }

    override public function start(host:String, port:Int):Void {
    }

    override public function sendSync(world:IWorld):Void {
    }

    override public function sendCommand(command:ICommand, currentUser:IUser):Void {
    }
}

class WorldTranslatorBytes implements IWorldTranslator{

    public function new(){
    }

    public function encode(world:IWorld):Dynamic {
        var bytes:BytesOutput = new BytesOutput();
        return bytes;
    }

    public function decode(data:Dynamic):IWorld {
        var bytes:BytesInput = cast(data, BytesInput);
        var world:IWorld = new World(bytes.readInt32());
        return world;
    }
}

class CommandTranslatorBytes implements ICommandTranslator {

    private var commandRegister:ICommandRegister;

    public function new(commandRegister:ICommandRegister){
        this.commandRegister = commandRegister;
    }

    public function encode(command:ICommand):Dynamic {
        var bytes:BytesOutput = new BytesOutput();
        return bytes;
    }

    public function decode(data:Dynamic):ICommand {
        var bytes:BytesInput = cast(data, BytesInput);
        var command:ICommand = commandRegister.createCommand(bytes.readInt8(), []);
        return command;
    }
}
