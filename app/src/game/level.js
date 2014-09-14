define([
    'lodash',
    'game/terrainBlock',
    'vendor/lightSource'
], function( _, TerrainBlock, LightSource ){
    function Level(data){
        if (!data || !data.source || !_.isNumber(data.width) || !_.isNumber(data.height)){
            throw new Error('Level cannot be empty');
        }

        this.source = data.source;
        this.width = data.width;
        this.height = data.height;

        this.map = {};

        this.lightGeometry = null;
    }

    Level.prototype.init = function(element){
        var x = 0, y = 0;

        _.each(this.source, function(char){
            if (TerrainBlock.isNeedProcess(char)){
                this.map[this.getMapIndex(x, y)] = new TerrainBlock({
                    source: char,
                    parent: element,
                    x: x,
                    y: y
                });
            }

            x++;

            if (x === this.width){
                x = 0;
                y++;
            }
        }, this);

        this.element = element;

        this.setAllTilesNotViewed();
    }

    Level.prototype.setAllTilesNotViewed = function(){
        this.element.find('*').addClass('viewed-none');
    }

    Level.prototype.setTileVisible = function(x, y){
        var tile = this.map[this.getMapIndex(x, y)];

        if (tile){
            tile.setVisible();
            return true;
        }

        return false;
    }

    Level.prototype.getMapIndex = function(x, y){
        return x + ',' + y;
    }

    Level.prototype.isPassable = function(x, y){
        return !this.map[this.getMapIndex(x, y)];
    }

    Level.prototype.calculateLightGeometry = function(){
        var self = this;

        this.lightGeometry = new LightSource({
            radius: 12,
            mapSize: {
                x: 32,
                y: 10
            },
            getLightLevel: function(x, y){
                return !self.isPassable(x, y);
            }
        });
    }

    Level.prototype.getLightGeometry = function(){
        if (this.lightGeometry === null){
            this.calculateLightGeometry();
        }
        return this.lightGeometry;
    }

    return Level;
});
