module.exports ={
    name: "char",
    description: "prints a character file to the invoking chat",
    execute(message, session, fs, args){
        
        try {
        
            console.log("attempting to access file");
            data = fs.readFileSync(`campaigns/${session}/${String(args).toLowerCase()}.txt`, 'utf8');
            console.log(data);
            console.log("data retrieved");
            message.reply(`here's ${args}'s character sheet:\n` + data);

        } catch (err) {

            console.error(err);

        }
    }
}