define([
    'viewModels/page',
    'providers/level',
    'providers/player',
    'pubsub',
    'enums/events'
], function(BasePageViewModel, LevelProvider, PlayerProvider, pubsub, events){
    function GameViewModel(element){
        var self = this;
        this.currentLevel = null;

        this.init(element, this);

        pubsub.subscribe(events.PAGE.SHOW, function(event, page){
            var levelProvider, playerProvider, player;

            if (page.viewmodel === self){
                levelProvider = new LevelProvider();
                playerProvider = new PlayerProvider();

                self.currentLevel = levelProvider.get();
                self.currentLevel.init($(element.find('layer[data-type="terrain"]')));
                pubsub.publish(events.LEVEL.CHANGE, self.currentLevel);

                player = playerProvider.get();
                player.setLevel(self.currentLevel, $(element.find('layer[data-type="characters"]')));
            }
        });

        pubsub.subscribe(events.PAGE.HIDE, function(event, page){
            if (page.viewmodel === self){
                //self.levelProvider = null;
            }
        });
    }

    GameViewModel.prototype = new BasePageViewModel();

    return GameViewModel;
});
