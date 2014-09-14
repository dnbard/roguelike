define([
    'lodash',
    'pubsub',
    'enums/events'
], function( _, pubsub, events ){
    function Character(){
        this.x = 1;
        this.y = 1;

        this.element = null;

        this.tokens = [];
    }

    Character.prototype.setLevel = function(level, element){
        this.element = $('<character class="player"></character>');

        element.append(this.element);

        this.element.css('left', this.x * 16);
        this.element.css('top', this.y * 16);
    }

    Character.prototype.dispose = function(){
        _.each(this.tokens, function(token){
            if (token.type === 'pubsub'){
                pubsub.unsubsribe(token.id);
            }
        });
    }

    Character.prototype.move = function(offsetX, offsetY){
        this.x += offsetX;
        this.y += offsetY;

        this.element.css('left', this.x * 16);
        this.element.css('top', this.y * 16);
    }

    return Character;
});
