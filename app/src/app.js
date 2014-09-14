define([
    'services/page',
    'services/keyboard'
], function(PageService, KeyboardService){

    function Application(){
        KeyboardService.init();

        PageService.activate('mainmenu');
    }

    return Application;
});
