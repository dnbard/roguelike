define([
    'lodash',
    'pubsub',
    'services/commands',
    'enums/events',
    'providers/level'
], function( _, pubsub, commandService, events, LevelProvider ){
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

        setTimeout(_.bind(function(){
            this.LOS();
        }, this));
    }

    Character.prototype.dispose = function(){
        _.each(this.tokens, function(token){
            if (token.type === 'pubsub'){
                pubsub.unsubsribe(token.id);
            } else if (token.type === 'command'){
                commandService.unsubsribe(token.id);
            }
        });
    }

    Character.prototype.move = function(offsetX, offsetY){
        var level = new LevelProvider().current();

        if (!level.isPassable(this.x + offsetX, this.y + offsetY)){
            return;
        }

        this.x += offsetX;
        this.y += offsetY;

        this.element.css('left', this.x * 16);
        this.element.css('top', this.y * 16);

        this.LOS();
    }

    Character.prototype.LOS = function(){
        var level = new LevelProvider().current(),
            x = this.x,
            y = this.y,
            lightResults;

        level.setAllTilesNotViewed();
        lightResults = level.getLightGeometry().update(x, y);

        _.each(lightResults, function(tile){
            if(tile.lightLevel > 0){
                level.setTileVisible(tile.x, tile.y);
            }
        });
    }

    return Character;
});
