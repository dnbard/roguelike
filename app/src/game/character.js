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
            y = this.y;

        level.setAllTilesNotViewed();
        var tilesToCheck = [];

        for(var i = x - 16; i < x + 16; i++){
            tilesToCheck.push({x: i, y: y - 16});
            tilesToCheck.push({x: i, y: y + 16});
        }

        for(var j = y - 16; j < y + 16; j++){
            tilesToCheck.push({x: x + 16, y: j});
            tilesToCheck.push({x: x - 16, y: j});
        }

        while(tilesToCheck.length > 0){
            var tile = tilesToCheck.pop(),
                distX = (tile.x - x),
                distY = (tile.y - y),
                max = Math.max(Math.abs(distX), Math.abs(distY)),
                dx = distX / max,
                dy = distY / max,
                dMax = Math.max(Math.abs(dx), Math.abs(dy)),
                cx = x + 0.5,
                cy = y + 0.5,
                traveled = 0;

            while(traveled <= max){
                cx += dx / 2;
                cy += dy / 2;

                //FIXME: AHHHHGRH! This is ugly
                level.setTileVisible(Math.floor( cx ), Math.floor( cy ));
                level.setTileVisible(Math.ceil( cx ), Math.ceil( cy ));

                if(level.setTileVisible(Math.round( cx ), Math.round( cy ))){
                    break;
                }

                traveled += dMax / 2;
            }
        }
    }

    return Character;
});
