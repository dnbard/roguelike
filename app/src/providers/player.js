define([
    'game/player'
], function(Player){
    var playerInstance = null;

    function PlayerProvider(){ }

    PlayerProvider.prototype.get = function(){
        if (playerInstance === null){
            playerInstance = new Player();
        }
        return playerInstance;
    }

    PlayerProvider.prototype.remove = function(){
        if (playerInstance && typeof playerInstance.dispose === 'function'){
            playerInstance.dispose();
        }

        playerInstance = null;
    }

    return PlayerProvider;
});
