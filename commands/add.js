module.exports ={
    name: "add",
    description: "Adds a monster to the priority list",
    execute(turnOrder, message, args){
        console.log(typeof args[0]);
        console.log(args.length);
        if (args[0].search(/\D/) == -1){ // just numbers
            console.log("args[0] is a number");
            for (x = 2; x < args.length; x++){
                args[1] = args[1] + " " + args[x];
            }
            
            turnOrder.push([args[0], args[1]]);

        } else if (args[0].search(/\D/) > -1) {
            console.log("args[0] is a string");
            for (let x = 1; x < args.length-1; x++){
                args[0] = args[0] + " " + args[x];
            }

            turnOrder.push([args[args.length-1], args[0]]);

        } else {
            
            console.log("incorrect syntax, could not be added");
            message.channel.send("Your instructions confuse me; nothing was added to the list.");
            return turnOrder;

        }

        message.channel.send("Added to priority list!");
        return turnOrder;
    }
}