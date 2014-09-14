define([
    'game/character',
    'pubsub',
    'enums/events'
], function(Character, pubsub, events){
    function Player(){
        var self = this;

        this.tokens.push({
            id: pubsub.subscribe(events.KEY.DOWN + '.D', function(){
                self.move(1, 0);
            }),
            type: 'pubsub'
        });

        this.tokens.push({
            id: pubsub.subscribe(events.KEY.DOWN + '.A', function(){
                self.move( -1, 0);
            }),
            type: 'pubsub'
        });

        this.tokens.push({
            id: pubsub.subscribe(events.KEY.DOWN + '.W', function(){
                self.move(0, -1);
            }),
            type: 'pubsub'
        });

        this.tokens.push({
            id: pubsub.subscribe(events.KEY.DOWN + '.S', function(){
                self.move(0, 1);
            }),
            type: 'pubsub'
        });
    }

    Player.prototype = new Character();

    return Player;
});
