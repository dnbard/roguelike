function Block(parent, params){
    var element = $('<div class="block '+ (params.class || '') +'">'+ (params.content || ' ') +'</div>');
    params = params || {};

    element.css('left', (params.x || 0) * 16 + 'px');
    element.css('top', (params.y || 0) * 16 + 'px');

    parent.append(element);
}

function Application(){
    var self = this;

    this.container = $('.container');

    var str = "##### ### ### ## # ###### ### ### ## # ###### ### ### ## # ###### ### ### ## # ###### ### ### ## # ###### ### ### ## # ###### ### ### ## # ###### ### ### ## # #";

    for(var i = 0; i < str.length; i ++){
        for(var j = 0; j < str.length; j ++){
            new Block(this.container, {
                x: i,
                y: j,
                class: str[i + j] > str.length - 1 ? str[i]: str[i+j] === '#' ? 'solid' : ''
            });
        }
    }

    new Block(this.container, {
        x: i - 1,
        y: j - 1,
        content: '@'
    });

    this.mousedown = function(event){
        self.container.on('mousemove', self.mousemove);
        return false;
    }

    this.mouseup = function(event){
        self.container.off('mousemove', self.mousemove);
        self.mouseMovement = null;
    }

    this.container.on('mousedown', this.mousedown);
    this.container.on('mouseup', this.mouseup);

    this.mouseMovement = null;

    this.mousemove = function(event){
        if (self.mouseMovement !== null){
            window.scrollBy((event.pageX - self.mouseMovement.x) * 0.5, (event.pageY - self.mouseMovement.y) * 0.5);
        }

        self.mouseMovement = {
            x : event.pageX,
            y : event.pageY
        }
    }
}


var app = new Application();
