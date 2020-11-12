module.exports ={
    name: "add",
    description: "Adds a monster to the priority list",
    execute(turnOrder, message, args){
        if (typeof args[0] == 'string' || typeof args[0] == 'number'){
            turnOrder.push([args[0], args[1]]); // Figure something out here to add all parts of a name
            message.channel.send("Added to priority list!");
        } else {
            console.log("incorrect syntax, could not be added");
            message.channel.send("Incorrect syntax: expected !add <initiative> <name>");
        }
        return turnOrder;
    }
}