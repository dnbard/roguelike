define([
    'game/level',
    'pubsub',
    'enums/events'
], function(Level, pubsub, events){
    var currentLevel = null;

    function LevelProvider(){

    }

    LevelProvider.prototype.get = function(query){
        var source = '################################' +
                     '#                              #' +
                     '#                              #' +
                     '#                              #' +
                     '#                              #' +
                     '#                              #' +
                     '#       ####-#############     #' +
                     '#       #                #     #' +
                     '#       |                #     #' +
                     '################################';

        return new Level({
            source: source,
            width: 32,
            height: 10
        });
    }

    LevelProvider.prototype.current = function(){
        return currentLevel;
    }

    pubsub.subscribe(events.LEVEL.CHANGE, function(event, level){
        currentLevel = level;
    });

    return LevelProvider;
});
