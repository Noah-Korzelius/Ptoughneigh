
//   ---Constants---
const DISCORD = require('discord.js');
const PROMPT = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const BOT = new DISCORD.Client();
const TOKEN = 'NzMzMzM4ODUwODcyNjU1OTQz.XxBtBg.IKe9aLY1PI0V22zlynWzINhpAXE';
const PREFIX = "!";
const fs = require('fs');
const REGISTRY = new Array('733401536037781585', '758512646005325875', '755534009668206754');
let collector; //To save bot output
let ID;
let temp; //generic variable 
let turnOrder = new Array();
let log = new Array(); //hold bot's responses to commands
//const ID = '758512646005325875'; ID for the stat channel 733401536037781585 (training grounds) 
                                //ID for the stat channel 755534009668206754 (the boyz d&d chat)
                                //ID for the stat channel 758512646005325875 (homies from home see)

BOT.commands = new DISCORD.Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    BOT.commands.set(command.name, command);
}

//   ---Startup---
BOT.once('ready', () =>{
    console.log('This bot is online!');
    PROMPT.question('which server would you like to use: \n(0)Training Grounds, \n(1)Homies from home, see\n(2)The Boyz D&D chat\n', channel => {
    ID = REGISTRY[channel];
    PROMPT.close();
});
});

//   ---Login---
BOT.login(TOKEN);


//   ---Command Handler---
BOT.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot){
        return;
    }
    collector = new DISCORD.MessageCollector(message.channel, m => m.author.bot, { max: 1 });
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping'){
        BOT.commands.get('ping').execute(message, args);
    } else if (command === 'initiative'){
        BOT.commands.get('initiative').execute(BOT, ID, message, args);
    } else if (command.endsWith('check')){
        BOT.commands.get('check').execute(BOT, ID, message, command);
    } else if (command === 'roll'){
        //console.log(args[0]); debugging comment
        message.reply(`you rolled a ${BOT.commands.get('roll').roll(Number(args[0].slice(1)))}`);
    } else if (command === 'help'){
        BOT.commands.get('help').execute(message, args);
    }
    collector.on('collect', m => {
        log.push(m);
        console.log("Collected: " + m);
        console.log(log);
    });
})


