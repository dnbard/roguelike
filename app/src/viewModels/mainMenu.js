define([
    'viewModels/page',
    'services/page'
], function(BasePageViewModel, PageService){
    function MainMenuViewModel(element){
        this.init(element, this);

        this.startGame = function(event){
            PageService.activate('111');
        }
    }

    MainMenuViewModel.prototype = new BasePageViewModel();

    return MainMenuViewModel;
});
