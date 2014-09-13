define([
    'viewModels/page',
    'providers/level',
    'pubsub',
    'enums/events'
], function(BasePageViewModel, LevelProvider, pubsub, events){
    function GameViewModel(element){
        var self = this;
        this.levelProvider = null;
        this.currentLevel = null;

        this.init(element, this);

        pubsub.subscribe(events.PAGE.SHOW, function(event, page){
            if (page.viewmodel === self){
                self.levelProvider = new LevelProvider();
                self.currentLevel = self.levelProvider.get();
                self.currentLevel.init(element);
            }
        });

        pubsub.subscribe(events.PAGE.HIDE, function(event, page){
            if (page.viewmodel === self){
                self.levelProvider = null;
            }
        });
    }

    GameViewModel.prototype = new BasePageViewModel();

    return GameViewModel;
});
