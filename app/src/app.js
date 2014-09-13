define([
    'services/page'
], function(PageService){
    function Application(){
        PageService.activate('mainmenu');
    }

    return Application;
});
