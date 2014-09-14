define([
    'enums/commands'
], function(commands){

    function KeyBindingsProvider(){
        this.bindings = {};

        this.bindings[commands.PLAYER.MOVE1] = ['Z', '1'];
        this.bindings[commands.PLAYER.MOVE2] = ['X', '2'];
        this.bindings[commands.PLAYER.MOVE3] = ['C', '3'];
        this.bindings[commands.PLAYER.MOVE4] = ['A', '4'];
        this.bindings[commands.PLAYER.MOVE5] = ['S', '5'];
        this.bindings[commands.PLAYER.MOVE6] = ['D', '6'];
        this.bindings[commands.PLAYER.MOVE7] = ['Q', '7'];
        this.bindings[commands.PLAYER.MOVE8] = ['W', '8'];
        this.bindings[commands.PLAYER.MOVE9] = ['E', '9'];
    }

    return KeyBindingsProvider;
});
