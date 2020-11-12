module.exports = {
    name: 'clear',
    description: 'clears the initiative list',
    execute(inList){
        while (inList.length > 0){
            inList.pop();
        }
        message.channel.send("Priority list cleared!");
        return inList;
    }
}