package ;
import com.hellespontus.engine.core.IEngine;
import com.hellespontus.engine.core.User;
import com.hellespontus.engine.d2.Entity2DRotated;
import haxe.Log;
import com.hellespontus.engine.d2.Engine;
@:expose class Test {

    public static var engine:IEngine;

    public function new() {
    }

    public static function main(){
        redirectTrace();
        engine = new Engine();
        for(i in 0...1000000){

        }
        trace("Hellespontus started, engine time=" + engine.time());

        Entity2DRotated;
        User;
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
