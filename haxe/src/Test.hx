package ;
import haxe.Log;
import com.hellespontus.engine.Worlds;
@:expose class Test {

    public static var model:Worlds;

    public function new() {
    }

    public static function main(){
        redirectTrace();

        trace("Hellespontus started");
        model = new Worlds();
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
