//   ---Constants---
const DISCORD = require('discord.js');
const PROMPT = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');
const path = require('path');
const https = require('https')
const { Character } = require('./classes/character');


const BOT = new DISCORD.Client();
const TOKEN = 'NzMzMzM4ODUwODcyNjU1OTQz.XxBtBg.sFuDZ9tm8CLiFO30XiNWIGqNh8U';
const PREFIX = "!";
const REGISTRY = new Array('733401536037781585', '758512646005325875', '755534009668206754');
const CAMPAIGNS = new Array('cmpn_1', 'cmpn_1', 'cmpn_2');
let collector; //To save bot output
//let session = "cmpn_1"; //tracks who the bot is helping right now
let ID; //probably going to be depreciated
let session = "campaigns/";
let party = new Array(); //characters in the campaign
let turnOrder = new Array(); //holds responses to !initiative
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
        let cmpn = CAMPAIGNS[channel]; //eventually, this will replace the channel registry
        console.log(`Ptoughneigh will be assisting ${channel}`);
        session = path.join(session, cmpn);
        //character = new Character(`campaigns/cmpn_1/sythe.txt`);//this won't be hardcoded after implementation
        try {
            
            let files = fs.readdirSync(session, 'utf-8');
            files.forEach(file => {
                party.push(new Character(session + "/" + file));
            });
            console.log(party);
            
        } catch (err) {

            console.error(err);

        }
        PROMPT.close();
    });
});

//   ---Login---
BOT.login(TOKEN);

// ---testing slash commands---

BOT.on('ready', () => {
    
    //post commands to the guilds ptoughneigh is in.

    BOT.api.applications('733338850872655943').guilds('668853927738998865').commands.post({
        data: {
            name: "roll",
            description: "Returns a random number between 1 and a passed value",
            options: [
                {
                    name: 'die',
                    description: 'the type of die to roll',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: 'd20',
                            value: '20'
                        },
                        {
                            name: 'd6',
                            value: '6'
                        }
                    ]
                }
            ]
        }
    });


    //guilds('733339844058808370')

    BOT.api.applications('733338850872655943').guilds('668853927738998865').commands.post({
        data: {
            name: "initiative",
            description: "Returns an initiative value for the invoking member"
        }
    });

    BOT.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        //get the invoking user's character from the party
        let character; 
        party.forEach(c => {
            console.log(c.name);
            console.log(c.player);
            if (c.player == interaction.member.user.id) {
                //console.log(message.author.id);
                character = c;
                return;
            }
        });
        
        //print args if it exists
        if (args){
            console.log(args[0].value);
        }
        
        if (command === 'roll') {
            try {
                let roll = BOT.commands.get('roll').roll(args[0].value);
                BOT.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: roll
                        }
                    }
                });
            } catch (error) {
                console.log("roll didn't work");
            }
        } else if (command === 'initiative') {
            try {
                BOT.commands.get('initiative').execute(BOT, character, interaction, args);
            } catch (error) {
                console.log("initiative didn't work");
                console.error(error);
            }
        }
    });
});


//   ---Command Handler---
BOT.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot){
        return;
    }
    collector = new DISCORD.MessageCollector(message.channel, m => m.author.bot, { max: 1 });
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();
    let character; 
    party.forEach(c => {
        console.log(c.name);
        console.log(c.player);
        if (c.player == message.author.id) {
            console.log(message.author.id);
            character = c;
            return;
        }
    });
    
    if (character) {
        console.log(character.name);
    } else {
        console.log("this player has no character");
    }
    
    console.log('args: ' + args);

    if (command === 'ping'){ // ---ping---

        BOT.commands.get('ping').execute(message, args);

    } else if (command === 'initiative'){ // ---initiative---

        BOT.commands.get('initiative_depreciated').execute(BOT, character, message, args);

    } else if (command === 'priority'){ // ---priority---

        BOT.commands.get('priority').execute(BOT, message, turnOrder);

    } else if (command === 'add'){ // ---add---

        turnOrder = BOT.commands.get('add').execute(turnOrder, message, args); 

    } else if (command === 'rm'){ // ---rm---

        turnOrder = BOT.commands.get('remove').execute(turnOrder, message, args);

    } else if (command === 'clear'){ // ---clear---

        turnOrder = BOT.commands.get('clear').execute(turnOrder, message);

    } else if (command.endsWith('check')){ // ---check---

        BOT.commands.get('check').execute(BOT, character, message, command);

    } else if (command === 'roll'){ // ---roll---

        BOT.commands.get('roll').execute(BOT, ID, message, args);

    } else if (command === 'help'){ // ---help---

        BOT.commands.get('help').execute(message, args);

    } else if (command === 'char'){ // ---viewChar---
    
        BOT.commands.get('char').execute(message, session, fs, args);
    
    } else if (command === 'newcharacter'){ // ---newCharacter---
        
        BOT.commands.get('newCharacter').execute(BOT, message, fs, args);
    
    } else if (command === 'info'){ //---info---

        BOT.commands.get('info').execute(BOT, message, args);
    
    }
    
    // ---Collector---
    collector.on('collect', m => {
        log.push(m);
        if (command === 'initiative'){
            turnOrder.push([m.content.split(' ')[4], m.content.split(' ')[0]]);
        }
        console.log(`Collected ${command}: ` + m);
    });
})


