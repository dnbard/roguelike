define([
    'game/level'
], function(Level){
    function LevelProvider(){

    }

    LevelProvider.prototype.get = function(query){
        var source = '################################' +
                     '#                              #' +
                     '#                              #' +
                     '#                              #' +
                     '#                              #' +
                     '#                              #' +
                     '################################';

        return new Level({
            source: source,
            width: 32,
            height: 7
        });
    }

    return LevelProvider;
});
