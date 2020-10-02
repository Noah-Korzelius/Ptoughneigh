/**
 *   ---TODO---
 * Implement multiple rolls on a single call for
 */
module.exports = {
    name: "roll",
    description: "a list of dice rolling functions for other functions to call",
    roll(max){
        let die = this.getRandomIntInclusive(1, max);
        return die;
    },
    rollD4(){
        let die = this.getRandomIntInclusive(1, 4);
        //console.log(die);
        return die; 
    },
    rollD6(){
        let die = this.getRandomIntInclusive(1, 6);
        return die;
    },
    rollD8(){
        let die = this.getRandomIntInclusive(1, 8);
        return die;
    },
    rollD10(){
        let die = this.getRandomIntInclusive(1, 10);
        return die;
    },
    rollD12(){
        let die = this.getRandomIntInclusive(1, 12);
        return die;
    },
    rollD20(){
        let die = this.getRandomIntInclusive(1, 20);
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