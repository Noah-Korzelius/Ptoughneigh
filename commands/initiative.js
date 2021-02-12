const { execute } = require("./roll");

module.exports = {
    name: "initiative",
    description: "rolls for initiative (dex check)",
    execute(BOT, character, message, args){
        let roll = BOT.commands.get('roll').getRandomIntInclusive(1, 20);
        
        console.log(`Message author: ${message.author}`);
        roll+=character.dexMod;
        console.log("modifier: " + character.dexMod);
        message.reply(`your initiative is ${roll}`);
    }
}