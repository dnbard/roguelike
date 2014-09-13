define([
    'jquery'
], function( $ ){
    var terrainProcessors = {
        '#': '<div class="block solid"></div>',
        '|': '<div class="block door vertical closed"></div>',
        '-': '<div class="block door horizontal closed"></div>'
    }

    function TerrainBlock(data){
        if (!data || !data.source || !data.parent || !_.isNumber(data.x) || !_.isNumber(data.y)){
            throw new Error('Invalid argument');
        }

        this.process(data);
    }

    TerrainBlock.prototype.process = function(data){
        var processorData = terrainProcessors[data.source];
        if (!processorData){ return; }

        this.element = $(typeof processorData === 'function' ? processorData() : processorData);

        data.parent.append(this.element);
        this.element.css('left', data.x * 16);
        this.element.css('top', data.y * 16);
    }

    TerrainBlock.isNeedProcess = function(source){
        return !!terrainProcessors[source];
    }

    return TerrainBlock;
});
