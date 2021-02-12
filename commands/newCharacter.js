const roll = require('./roll');

module.exports = {
    name: "newCharacter",
    description: "Creates a new character in the designated campaign" +
    "and binds it to the invoking user.",

    execute(BOT, message, fs, args){
        const DISCORD = require('C:/Users/Noah Korzelius/Desktop/Ptoughneigh/node_modules/discord.js');
        const collector = new DISCORD.MessageCollector(message.channel, m =>
            m.author.id === message.author.id, { time: 10000 });
        
        let filename = "campaigns/cmpn_1/aNewCharacter.txt";
        let stats = [];
        let temp = [];
        let roll = 0;
        let min = 6;

        try {
            fs.appendFileSync(filename, `player: ${message.author.id}\n`);
            message.reply("would you like me to generate stat rolls for you?");
            collector.on('collect', m => {
                if (m.author.id == message.author.id) {
                    if (m.content.toLowerCase().startsWith('y')) {

                        message.reply("okay, I'll generate those for you.");

                        for (let x = 0; x < 6; x++) {
                            for (let y = 0; y < 5; y++) {

                                temp.push(BOT.commands.get('roll').roll(6));

                            }

                            temp.forEach(n => {
                                if (n < min) {
                                    min = n;
                                } 
                            });

                            temp.slice(temp.indexOf(min), 1);
                            temp.forEach(n => roll+=n);
                            stats.push(roll);
                            roll = 0;
                            min = 6;
                            temp = [];

                        }

                        message.channel.send(`The six numbers generated are: ${stats.toString()}`);
                    
                    } else if (m.content.toLowerCase().startsWith('n')) {
                        
                        message.reply("please give me your rolls then (separated by commas OR spaces, not both)");
                        collector.on('collect', m => {
                            stats = m.content.split(/[\s,]/);
                            console.log(stats);
                        });

                    }

                    fs.appendFileSync(filename, stats.toString() + "\n");
                    console.log(`created filename`);

                }
            });

        } catch (err) {

            console.error(err);

        }

    }
}