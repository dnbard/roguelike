define([
    'game/character'
], function(Character){
    function Player(){
    }

    Player.prototype = new Character();

    return Player;
});
