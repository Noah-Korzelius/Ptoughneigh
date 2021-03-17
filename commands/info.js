module.exports = {
    name: "info",
    desc: "command to query a database for d&d information",
    execute(BOT, msg, args){
        const axios = require('axios').default;

        //ensure that args are correct and set up the url to query
        if (args.length < 1) {
            msg.reply("I don't know what you're looking for; please use !info <name of feature to lookup>");
            console.log("lookup aborted");
            return;
        } else {
            let requestURL = `https://www.dnd5eapi.co/api/`;
            let query = '';
            args.forEach(s => {
                query = query.concat(s.toLowerCase());
                if (args.indexOf(s) < args.length-1){
                    query = query.concat('-');
                }
            });

            console.log(`query: ${query}`);

            //brute force search the database

            //character data
            axios.get(requestURL+'skills/'+query)
            .then(function(response){
                msg.reply("here's what I found:\n" + response.data.desc.toString());
                return;
            })
            .catch(function(error){
                console.log("could not find spell");
            });
            
            axios.get(requestURL+'proficiencies/'+query)
            .then(function(response){
                msg.reply("here's what I found:\n" + response.data.desc.toString());
                return;
            })
            .catch(function(error){
                console.log("could not find spell");
            });

            //classes
            axios.get(requestURL+'classes/'+query)
            .then(function(response){
                msg.reply("here's what I found:\n" + response.data.desc.toString());
                return;
            })
            .catch(function(error){
                console.log("could not find spell");
            });

            axios.get(requestURL+'subclasses/'+query)
            .then(function(response){
                msg.reply("here's what I found:\n" + response.data.desc.toString());
                return;
            })
            .catch(function(error){
                console.log("could not find spell");
            });

            axios.get(requestURL+'features/'+query)
            .then(function(response){
                msg.reply("here's what I found:\n" + response.data.desc.toString());
                return;
            })
            .catch(function(error){
                console.log("could not find spell");
            });

            //spells           
            axios.get(requestURL+'spells/'+query)
            .then(function(response){
                msg.reply("here's what I found:\n" + response.data.desc.toString());
                return;
            })
            .catch(function(error){
                console.log("could not find spell");
            });

            //monsters
            axios.get(requestURL+'monsters/'+query)
            .then(function(response){
                msg.reply("here's what I found:\n" + response.data.desc.toString());
                return;
            })
            .catch(function(error){
                console.log("could not find class");
            });
        }
    }
}