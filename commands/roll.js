module.exports = {
    name: "roll",
    description: "a list of dice rolling functions for other functions to call",
    execute(BOT, ID, message, args){
        let result = 0;
        let mods = new Array;
        let addition = "";
        if (args[0].search(/\dd/) > -1) { //multiple dice to roll
            for (let x = 0; x < args[0].charAt(0)-1; x++){
                console.log(args[0].slice(args[0].search(/d/)+1));
                mods.push(this.roll(args[0].slice(args[0].search(/d/)+1)));
                result = result + mods[x];
            }
            args[0] = args[0].slice(args[0].search(/d/));
            console.log(`args[0] after multiplce dice rolled: ${args[0]}`);
        }
        // if (args.length > 1 && args[1].search(/[a-zA-z]\D\D/) > -1) {//add a stat

        //     BOT.channels.cache.get(ID).messages.fetch({limit: 100})
        //     .then(messages => stat = Number(BOT.commands.get('roll')
        //     .get(args[1], BOT.commands.get('roll').getUserMessages(message.author, messages))))
        //     .then(stat => result = result + stat)
        //     .catch(console.error);

        // }
        if (args[args.length-1].search(/\+/) > -1) { //adds a provided num 

            console.log(args[args.length-1]);
            mods.push(Number(args[args.length-1].match(/\d+/)));
            result = result + mods[mods.length-1];
            
        }
        for (let x = 0; x < mods.length; x++){
                addition = addition + mods[x] + " + ";
        }
        mods.push(this.roll(Number(args[0].slice(1))));
        result = result + mods[mods.length-1];
        message.reply(`you rolled a ${result} (${mods})`);

    },
    roll(max){
        let die = this.getRandomIntInclusive(1, max);
        return die;
    },
    getRandomIntInclusive(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getUserMessages(id, msgs){
        const count = msgs[Symbol.iterator]();
        let userMsgs = [''];
        console.log(`ID passed: ${id}`);
        for(const msg of count){
            // console.log(msg[1].author.username);
            // console.log(msg[1].author.id);
            // console.log(msg[1].content);
            if (msg[1].author.id == id){
                userMsgs.push(msg[1].content);
                console.log(userMsgs[0]);
            }
        }
        return userMsgs;
    },
    get(stat, msgs){
        const PREFIX = stat;
        for(let x = 0; x < msgs.length; x++){
            console.log(msgs[x]);
            if (msgs[x].toLowerCase().startsWith(PREFIX)){
                console.log(`retrieved "${msgs[x].slice(PREFIX.length+1)}"`);
                return msgs[x].slice(PREFIX.length+1);
            }
        }
    },
    getDex(msgs){
        const PREFIX = 'dex';
        for(let x = 0; x < msgs.length; x++){
            console.log(msgs[x]);
            if (msgs[x].toLowerCase().startsWith(PREFIX)){
                console.log(msgs[x].slice(PREFIX.length+1));
                return msgs[x].slice(PREFIX.length+1);
            }
        }
    },
    getStr(msgs){
        const PREFIX = 'str';
        for(let x = 0; x < msgs.length; x++){
            console.log(msgs[x]);
            if (msgs[x].toLowerCase().startsWith(PREFIX)){
                console.log(msgs[x].slice(PREFIX.length+1));
                return msgs[x].slice(PREFIX.length+1);
            }
        }
    },
    getConst(msgs){
        const PREFIX = 'const';
        for(let x = 0; x < msgs.length; x++){
            console.log(msgs[x]);
            if (msgs[x].toLowerCase().startsWith(PREFIX)){
                console.log(msgs[x].slice(PREFIX.length+1));
                return msgs[x].slice(PREFIX.length+1);
            }
        }
    },
    getInt(msgs){
        const PREFIX = 'int';
        for(let x = 0; x < msgs.length; x++){
            console.log(msgs[x]);
            if (msgs[x].toLowerCase().startsWith(PREFIX)){
                console.log(msgs[x].slice(PREFIX.length+1));
                return msgs[x].slice(PREFIX.length+1);
            }
        }
    },
    getWis(msgs){
        const PREFIX = 'wis';
        for(let x = 0; x < msgs.length; x++){
            console.log(msgs[x]);
            if (msgs[x].toLowerCase().startsWith(PREFIX)){
                console.log(msgs[x].slice(PREFIX.length+1));
                return msgs[x].slice(PREFIX.length+1);
            }
        }
    },
    getChar(msgs){
        const PREFIX = 'char';
        for(let x = 0; x < msgs.length; x++){
            console.log(msgs[x]);
            if (msgs[x].toLowerCase().startsWith(PREFIX)){
                console.log(msgs[x].slice(PREFIX.length+1));
                return msgs[x].slice(PREFIX.length+1);
            }
        }
    }
}