define([
    'jquery',
    'lodash'
], function( $, _ ){
    function BasePageViewModel(){
    }

    BasePageViewModel.prototype.init = function(element, viewModel){
        element.on('click', _.bind(this.click, viewModel));
    }

    BasePageViewModel.prototype.click = function(event){
        var clickHandler = $(event.target).attr('click');

        if (!clickHandler){
            return true;
        }

        if (typeof this[clickHandler] === 'function'){
            this[clickHandler](event);
        }

        return false;
    }


    return BasePageViewModel;
});
