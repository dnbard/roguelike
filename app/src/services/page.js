define([
    'jquery',
    'lodash',
    'pubsub',
    'enums/events'
], function( $, _, pubsub, events ){
    function PageService(){
        var pages = $('.page'),
            count = pages.length,
            self = this;

        this.pages = {};
        this.activePage = null;

        _.each(pages, function(page){
            var $page = $(page),
                pageId = $page.attr('id'),
                viewmodelName = $page.attr('viewmodel');

            if (!pageId || typeof pageId !== 'string' || self.pages[pageId]){
                throw new Error('Page must have an uniue ID');
            }

            pageId = pageId.toLowerCase();

            self.pages[pageId] = {
                id: pageId,
                content: $page.html(),
                isActive: false
            };

            //load viewmodel
            if (viewmodelName){
                require(['viewModels/' + viewmodelName], function(Viewmodel){
                    self.pages[pageId].viewmodel = new Viewmodel($page);
                });
            }

            $page.html('');
        });
    }

    PageService.prototype.activate = function(pageId){
        if (typeof pageId !== 'string' || pageId.length === 0){
            throw new Error('Invalid argument');
        }

        if (!this.pages[pageId]){
            throw new Error('Page not found');
        }

        //deactivate current page
        if (this.activePage){
            $('#' + this.activePage.id).html('');
            this.activePage.isActive = false;

            pubsub.publish(events.PAGE.HIDE, this.activePage);
        }

        this.activePage = this.pages[pageId];

        $('#' + this.activePage.id).html(this.activePage.content);
        this.activePage.isActive = true;
        pubsub.publish(events.PAGE.SHOW, this.activePage);

        return this.activePage;
    }

    PageService.prototype.list = function(){
        return _.keys(this.pages);
    }

    return new PageService();
});
