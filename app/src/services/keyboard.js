define([
    'jquery',
    'lodash',
    'pubsub',
    'enums/events'
], function( $, _, pubsub, events ){
    function KeyboardService(){
        this.pressed = {};
    }

    KeyboardService.prototype.init = function(){
        $(document).on('keydown', _.bind(function(event){
            var keyCode = event.keyCode,
                char = String.fromCharCode(keyCode),
                rightNow = new Date();

            console.log('keydown: %s (%s)', char, keyCode);

            if (char && (!this.pressed[char] || rightNow - this.pressed[char].timestamp > 250)){
                this.pressed[char] = {
                    timestamp: rightNow
                }

                pubsub.publish(events.KEY.DOWN, char);
            }
        }, this));

        $(document).on('keyup', _.bind(function(event){
            var keyCode = event.keyCode,
                char = String.fromCharCode(keyCode);

            console.log('keyup: %s (%s)', char, keyCode);

            if (char){
                this.pressed[char] = null;
                pubsub.publish(events.KEY.UP, char);
            }
        }, this));
    }

    return new KeyboardService();
});
