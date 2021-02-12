const { execute } = require('./roll');

module.exports = {
    name: "check",
    description: "a generic method for rolling a d20 and adding a particular modifier onto it",
    execute(BOT, character, message, args){
        let roll = BOT.commands.get('roll').roll(20);
        let check = args.split('check');

        if (roll == 20){
            message.reply('you rolled a natural 20!');
        } else if (roll == 1){
            message.reply('you rolled a natural 1.');
        }
        console.log(check + "\n" + roll);
        console.log(`Message author: ${message.author}`);     
        
        switch (check[0]) {
            case "str":
                roll+=character.strMod;
                console.log("modifier:" + character.strMod);
                break;
            
            case "dex":
                roll+=character.dexMod;
                console.log("modifier:" + character.dexMod);
                break;
            
            case "con":
                roll+=character.conMod;
                console.log("modifier:" + character.conMod);
                break;

            case "int":
                roll+=character.intMod;
                console.log("modifier:" + character.intMod);
                break;

            case "wis":
                roll+=character.wisMod;
                console.log("modifier:" + character.wisMod);
                break;

            case "cha":
                roll+=character.chaMod;
                console.log("modifier:" + character.chaMod);
                break;
            
            default:
                console.log("no stat could be parsed from inStat" + 
                "\nNothing was added");
                break;
        }
        message.reply(`you rolled a ${roll}`);
    }
}