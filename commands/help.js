module.exports = {
    name: "help",
    description: "Sends a help message to the chat",
    execute(message, args){
        //Reply to the command call
        message.reply("Since v2.0, use of a stat channel is depricated; please use the !newCharacter command to get started. \n" +
        "Command List: \n" +
        "-!checkStr: rolls a d20 and adds your strength modifier\n" +
        "-!checkDex: rolls a d20 and adds your dexterity modifier\n" +
        "-!checkCon: rolls a d20 and adds your constitution modifier\n" +
        "-!checkInt: rolls a d20 and adds your intelligence modifier\n" +
        "-!checkWis: rolls a d20 and adds your wisdom modifier\n" +
        "-!checkCha: rolls a d20 and adds your charisma modifier\n" +
        "\n" +
        "-!initiative: rolls a d20 and adds your dexterity(initiative) modifier\n" +
        "-!add <initiative> <name>: adds <name> to the priority list with <initiative>\n" +
        "-!rm <name>: removes all instances of <name> on the priority list\n" +
        "-!priority: sends the current order of priority\n" +
        "-!clear: clear the list of initiative\n" +
        "\n" +
        "!roll + d4, d6, d8, d10, d12, d20: rolls the indicated die." +
        " Use a number before to indicate if you want more than one rolled (ex. 3d6 rolls 3 d6s).");
    }
}