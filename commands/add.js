module.exports ={
    name: "add",
    description: "Adds a monster to the priority list",
    execute(BOT, turnOrder, interaction, args){
        console.log(typeof args[0].value);
        console.log(args.length);
        if (args[0].value.search(/[^-]\D/) == -1 && args.length > 1){ // just numbers
            
            console.log("args[0] is a number");
            for (x = 2; x < args.length; x++){
                args[1].value = args[1].value + " " + args[x].value;
            }
            
            turnOrder.push([args[0].value, args[1].value]);

        } else if (args[0].value.search(/\D/) > -1 && args.length > 1) {
            
            console.log("args[0] is a string");
            for (let x = 1; x < args.length-1; x++){
                args[0].value = args[0].value + " " + args[x].value;
            }

            turnOrder.push([args[args.length-1].value, args[0].value]);

        } else {
            
            console.log("incorrect syntax, could not be added");
            try {
                BOT.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "Your instructions confuse me; nothing was added to the list"
                        }
                    }
                });
            } catch (error) {
                console.log("incorect synta call did not work");
                console.error(error);
            }
            
            return turnOrder;

        }

        try {
            BOT.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Added to priority list!"
                    }
                }
            });
        } catch (error) {
            console.log("final return syntax failed");
            console.error(error);
        }

        return turnOrder;
    },
    
    
    execute_depreciated(turnOrder, message, args){
        console.log(typeof args[0]);
        console.log(args.length);
        if (args[0].search(/[^-]\D/) == -1 && args.length > 1){ // just numbers
            
            console.log("args[0] is a number");
            for (x = 2; x < args.length; x++){
                args[1] = args[1] + " " + args[x];
            }
            
            turnOrder.push([args[0], args[1]]);

        } else if (args[0].search(/\D/) > -1 && args.length > 1) {
            
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