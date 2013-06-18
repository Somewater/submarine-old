package ;
import com.hellespontus.engine.World;
class Test {

    public static var model:World;

    public function new() {
    }

    public static function main(){
        trace("Hello, world");
        model = new World(0);    
    }
}
