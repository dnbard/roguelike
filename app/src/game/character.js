define([], function(){
    function Character(){
        this.x = 1;
        this.y = 1;

        this.element = null;
    }

    Character.prototype.setLevel = function(level, element){
        this.element = $('<character class="player"></character>');

        element.append(this.element);

        this.element.css('left', this.x * 16);
        this.element.css('top', this.y * 16);
    }

    return Character;
});
