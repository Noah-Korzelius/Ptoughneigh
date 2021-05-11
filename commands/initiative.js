/**
 * TODO - Check ids in the list and don't let the same person add to the list again
 */
const { execute } = require("./roll");

module.exports = {
    name: "initiative",
    description: "rolls for initiative (dex check)",
    execute(BOT, character, interaction, args){
        let roll = BOT.commands.get('roll').getRandomIntInclusive(1, 20);
        console.log(`Invoker: ${interaction.member.user.id}`);

        roll+=character.dexMod;
        console.log("modifier: " + character.dexMod);
        
        try {
            BOT.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `your initiative is ${roll}`
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    },
    
    
    execute_depreciated(BOT, character, message, args){
        let roll = BOT.commands.get('roll').getRandomIntInclusive(1, 20);
        
        console.log(`Message author: ${message.author}`);
        roll+=character.dexMod;
        console.log("modifier: " + character.dexMod);
        message.reply(`your initiative is ${roll}`);
    }
}