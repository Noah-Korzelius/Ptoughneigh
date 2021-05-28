const { execute } = require('./util');

module.exports = {
    name: 'priority',
    description: 'creates an ordered list of most recent initiative calls',
    execute(BOT, turnOrder, interaction){
        
        if(turnOrder.length < 1) {
            console.log("slash command used");
            return;
        }

        console.log("list before sorting: " + turnOrder);
        turnOrder.sort(function(a, b){return b[0]-a[0]});
        console.log("list before sending: " + turnOrder);

        
        let msg = BOT.commands.get('util').listToMessage(turnOrder);
        BOT.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: msg
                }
            }
        });
        console.log("slash command priority resolved");
    },

    execute_depreciated(BOT, turnOrder, message){
        
        if(turnOrder.length < 1) {
            if (message){
                message.channel.send("No one's in combat!");
                return;
            } else {
                console.log("slash command used");
                return;
            }
        }

        console.log("list before sorting: " + turnOrder);
        turnOrder.sort(function(a, b){return b[0]-a[0]});
        console.log("list before sending: " + turnOrder);
        if (message){
            message.channel.send(BOT.commands.get('util').listToMessage(turnOrder));
        }
    }
}