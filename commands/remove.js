module.exports ={
    name: "remove",
    description: "removes an entry from the priority list",
    execute(turnOrder, message, args){
        for (let x = 0; x < turnOrder.length; x++){
            if (turnOrder[x][1] === args[0]){
                turnOrder.splice(x);
                message.reply(`Removed ${args[0]} from the list`);
            }
        }
        return turnOrder;
    }
}