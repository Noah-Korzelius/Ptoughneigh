module.exports = {
    name: 'util',
    description: 'provides functionality for other BOT commands',
    isInLog(inMsg, inLog){//returns a boolean value of whether or not a passed message object is in a passed log
        for (const msg of inLog){
            if (msg == inMsg){
                return true;
            }
        }
        return false;
    },
    isInit(inMsg){//returns a boolean value of whether or not the passed string was an initiative check message
        if (inMsg.content.split(' ')[2] == 'initiative'){
            return true;
        } else {
            return false;
        }
    },
    getAuthors(inLog){//returns an array of each author in an array of message objects
        let x;
        let add;
        let authors = new Array();
        for(const msg of inLog){
            add = true;
            for (x = 0; x < authors.length; x++){
                if (msg.author.id == authors[x]){
                    add = false;
                }
            }
            if (add){
                authors.push(msg.author);
            }
        }
        return authors;
    },
    listToMessage(inList){//returns a string representation of an array of players and initaitive
        let msg = '';
        for (const player of inList){
            msg = msg + player[0] + ' ' + player[1] + '\n';
        }
        return msg;
    }
}