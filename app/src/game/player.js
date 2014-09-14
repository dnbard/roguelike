define([
    'game/character',
    'services/commands',
    'enums/commands'
], function(Character, commandService, commands){
    function Player(){
        var self = this;

        this.tokens.push({
            id: commandService.subscribe(commands.PLAYER.MOVE1, function(){ self.move(-1, 1); }),
            type: 'command'
        });

        this.tokens.push({
            id: commandService.subscribe(commands.PLAYER.MOVE2, function(){ self.move(0, 1); }),
            type: 'command'
        });

        this.tokens.push({
            id: commandService.subscribe(commands.PLAYER.MOVE3, function(){ self.move(1, 1); }),
            type: 'command'
        });

        this.tokens.push({
            id: commandService.subscribe(commands.PLAYER.MOVE4, function(){ self.move(-1, 0); }),
            type: 'command'
        });

        this.tokens.push({
            id: commandService.subscribe(commands.PLAYER.MOVE5, function(){ self.move(0, 0); }),
            type: 'command'
        });

        this.tokens.push({
            id: commandService.subscribe(commands.PLAYER.MOVE6, function(){ self.move(1, 0); }),
            type: 'command'
        });

        this.tokens.push({
            id: commandService.subscribe(commands.PLAYER.MOVE7, function(){ self.move(-1, -1); }),
            type: 'command'
        });

        this.tokens.push({
            id: commandService.subscribe(commands.PLAYER.MOVE8, function(){ self.move(0, -1); }),
            type: 'command'
        });

        this.tokens.push({
            id: commandService.subscribe(commands.PLAYER.MOVE9, function(){ self.move(1, -1); }),
            type: 'command'
        });
    }

    Player.prototype = new Character();

    return Player;
});
