module.exports = {
    name: "help",
    description: "Sends a help message to the chat",
    execute(message, args){
        //Reply to the command call
        message.reply("to make use of Ptoughneigh, make sure to send your stats to the required channel. \n" +
        "Command List: \n" +
        "-!checkStr: rolls a d20 and adds your strength modifier\n" +
        "-!checkDex: rolls a d20 and adds your dexterity modifier\n" +
        "-!checkConst: rolls a d20 and adds your constitution modifier\n" +
        "-!checkInt: rolls a d20 and adds your intelligence modifier\n" +
        "-!checkWis: rolls a d20 and adds your wisdom modifier\n" +
        "-!checkChar: rolls a d20 and adds your charisma modifier\n" +
        "\n" +
        "-!initiative: rolls a d20 and adds your dexterity(initiative) modifier\n" +
        "\n" +
        "!roll + d4, d6, d8, d10, d12, d20: rolls the indicated die");
    }
}