const { execute } = require('./util');

module.exports = {
    name: 'priority',
    description: 'creates an ordered list of most recent initiative calls',
    execute(BOT, message, turnOrder){
        
        if(turnOrder.length < 1) {
            message.channel.send("No one's in combat!")
            return;
        }

        console.log("list before sorting: " + turnOrder);
        turnOrder.sort(function(a, b){return b[0]-a[0]});
        console.log("list before sending: " + turnOrder);
        message.channel.send(BOT.commands.get('util').listToMessage(turnOrder));
    }
}