package ;
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
        new SubmarineEngineController(engine, ticker).start();
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

    override private function connectToServer():Void {
        trace('connect to server...');
        fakeWorld();
        onEngineInitialized();
    }

    private function fakeWorld():Void {
        var u:IUser = engine.createUser();
        engine.user = u;
    
        var w:IWorld = new World(0);
        engine.addState(w);
        
    }
}
