const { execute } = require('./roll');

module.exports = {
    name: "check",
    description: "a generic method for rolling a d20 and adding a particular modifier onto it",
    execute(BOT, ID, message, args){
        let die = BOT.commands.get('roll').roll(20);
        let roll;
        let check = args.split('check');
        let stat;

        if (die == 20){
            message.reply('you rolled a natural 20!');
        } else if (die == 1){
            message.reply('you rolled a natural 1.');
        }
        
        console.log(check);
        console.log(`Message author: ${message.author}`);

        BOT.channels.cache.get(ID).messages.fetch({limit: 100})
        .then(messages => stat = Number(BOT.commands.get('roll')
        .get(check[0], BOT.commands.get('roll').getUserMessages(message.author, messages))))
        .then(stat => roll = die + stat)
        .then(roll => message.reply(`you rolled a ${roll}(${die} + ${stat})`))
        .catch(console.error);
    }
}