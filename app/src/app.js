define([
    'services/page'
], function(PageService){
    function Application(){
        PageService.activate('view');
    }

    return Application;
});
