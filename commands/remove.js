module.exports ={
    name: "remove",
    description: "removes an entry from the priority list",
    execute(turnOrder, message, args){
        if (args[0] === "me"){
            console.log(message.author.id);
            args[0] = `<@${message.author.id}>,`;
        }
        console.log(args);
        for (let x = 0; x < turnOrder.length; x++){
            console.log(turnOrder[x]);
            if (turnOrder[x][1] === args[0]){
                turnOrder.splice(x);
                message.reply(`removed ${args[0]} from the list`);
            }
        }
        return turnOrder;
    }
}