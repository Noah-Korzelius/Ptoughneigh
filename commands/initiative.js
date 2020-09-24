const { execute } = require("./roll");

module.exports = {
    name: "initiative",
    description: "rolls for initiative (dex check)",
    execute(BOT, ID, message, args){
        let die = BOT.commands.get('roll').getRandomIntInclusive(1, 20);
        let roll;
        let dex;
        
        console.log(`Message author: ${message.author}`); 
        BOT.channels.cache.get(ID).messages.fetch({limit: 100})
        .then(messages => dex = Number(BOT.commands.get('roll')
        .getDex(BOT.commands.get('roll').getUserMessages(message.author, messages))))
        .then(dex => roll = die + dex)
        .then(roll => message.reply(`you rolled a ${roll}(${die} + ${dex})`))
        .catch(console.error);

    }
}