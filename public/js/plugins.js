// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
// ...

$(document).ready(function() {
    (function($){
        $.fn.positionCenter = function(options) {
            var pos = {
                sTop : function() {
                    return window.pageYOffset || document.documentElement && document.documentElement.scrollTop ||	document.body.scrollTop;
                },
                wHeight : function() {
                    return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body.clientHeight;
                }
            };
            return this.each(function(index) {
                if (index == 0) {
                    var $this = $(this);
                    var elHeight = $this.outerHeight();
                    var elTop = pos.sTop() + (pos.wHeight() / 2) - (elHeight / 2);
                    $this.css({
                        position: 'absolute',
                        margin: '0',
                        top: elTop,
                        left: (($(window).width() - $this.outerWidth()) / 2) + 'px'
                    });
                }
            });
        };
    })(jQuery);
});
    