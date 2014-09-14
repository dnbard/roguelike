define([
    'lodash',
    'pubsub',
    'enums/events',
    'enums/commands',
    'providers/uuid',
    'providers/keyBindings'
], function(_, pubsub, events, commands, uuid, KeyBindings){

    function CommandsService(){
        this.keyBindings = new KeyBindings();

        this.tokens = [];
    }

    CommandsService.prototype.subscribe = function(commandName, handler){
        var keys = this.keyBindings.bindings[commandName],
            assigned = _.filter(this.tokens, function(token){
                return token.command === commandName;
            }) || [],
            self = this;

        if (!keys){
            throw new Error('Command %s not found', commandName);
        }

        _.each(assigned, function(assignedCommand){
            self.unsubscribe(assignedCommand.id);
        });

        _.each(keys, function(key){
            self.tokens.push({
                id: uuid(),
                index: pubsub.subscribe(events.KEY.DOWN + '.' + key.toUpperCase(), handler),
                type: 'pubsub',
                command: commandName
            });
        });
    }

    CommandsService.prototype.unsubscribe = function(id){
        var command = _.remove(this.tokens, function(token){
            return token.id === id;
        });

        if (command.length === 0){
            return;
        } else if (command.length > 1){
            throw new Error('Index is not unique');
        }

        command = command[0];

        pubsub.unsubscribe(command.index);
    }

    return new CommandsService();
});
