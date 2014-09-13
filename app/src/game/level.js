define([
    'lodash',
    'game/terrainBlock'
], function( _, TerrainBlock){
    function Level(data){
        if (!data || !data.source || !_.isNumber(data.width) || !_.isNumber(data.height)){
            throw new Error('Level cannot be empty');
        }

        this.source = data.source;
        this.width = data.width;
        this.height = data.height;

        this.map = {};
    }

    Level.prototype.init = function(element){
        var x = 0, y = 0;

        _.each(this.source, function(char){
            if (TerrainBlock.isNeedProcess(char)){
                this.map[x + ',' + y] = new TerrainBlock({
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
    }

    return Level;
});
