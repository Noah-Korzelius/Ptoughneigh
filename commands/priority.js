const { execute } = require('./util');

module.exports = {
    name: 'priority',
    description: 'creates an ordered list of most recent initiative calls',
    execute(BOT, ID, message, turnOrder, args){
        let msg;
        let temp = new Array();
        let priority = new Array();
        
        for (let x = 0; x < turnOrder.length; x++){
            temp = [turnOrder[x].content.split(' ')[4], turnOrder[x].content.split(' ')[0]];
            console.log(temp);
            priority.push(temp);
        }
        console.log("list before sorting: " + priority);
        priority.sort(function(a, b){return b[0]-a[0]});
        console.log("list before sending: " + priority);
        message.channel.send(BOT.commands.get('util').listToMessage(priority));
    }
}