

class Character {
    /**
     * constructor takes in a filename or array and parses it for 
     * data to assign to a character
     * 
     * @param {a file or array of stats to assign to a character} inStats
     */
    constructor(inStats) {
        const fs = require('fs');
        let arr;
        if (typeof(inStats) ==='string') {

            try {

                let data = fs.readFileSync(String(inStats), 'utf8'); 
                arr = data.split(/[\|\r\n]/gm);
                for (let x = 0; x < arr.length; x++) {
                    if (arr[x] === '') {
                        arr.splice(x, 1);
                        x--;
                    }
                }
                console.log(arr);

            } catch (err) {

                console.error(err);

            }

        } else { //assume that inStats is already an Array

            arr = inStats;

        }

        this.player = arr[0].match(/\d+/)[0]; //this needs to be left as a string bc overflow (I think)
        this.name = arr[1];
        this.race = arr[2];
        this.class = arr[3];
        this.level = arr[4];
        this.xp = arr[5];
        this.inspiration = arr[6];
        this.hp = arr[7];
        this.proficiency = arr[8];
        this.armor = arr[9];
        this.strength = arr[10].match(/\d+/); //use regex to get just ints for these
        this.strMod = Number(arr[11].match(/-?\d+/));
        this.strSave = arr[12];
        this.dexterity = arr[13];
        this.dexMod = Number(arr[14].match(/-?\d+/));
        this.dexSave = arr[15];
        this.constitution = arr[16];
        this.conMod = Number(arr[17].match(/-?\d+/));
        this.conSave = arr[18];
        this.intelect = arr[19];
        this.intMod = Number(arr[20].match(/-?\d+/));
        this.intSave = arr[21];
        this.wisdom = arr[22];
        this.wisMod = Number(arr[23].match(/-?\d+/));
        this.wisSave = arr[24];
        this.charisma = arr[25];
        this.chaMod = Number(arr[26].match(/-?\d+/));
        this.chaSave = arr[27];
    }

    /** 
     * updated check method, roles a d20 and adds the desired modifier
    */
    check(inStat){
        let stat = inStat.toLowerCase().split(0, 3);
        let roll = roll(20);
        switch (stat) {
            case "str":
                roll+=this.strMod;
                break;
            
            case "dex":
                roll+=this.dexMod;
                break;
            
            case "con":
                roll+=this.conMod;
                break;

            case "int":
                roll+=this.intMod;
                break;

            case "wis":
                roll+=this.wisMod;
                break;

            case "cha":
                roll+=this.chaMod;
                break;
            
            default:
                console.log("no stat could be parsed from inStat" + 
                "\nNothing was added");
                break;
        }
    }

    /**
     * writes all the data of the character to a file, overwriting the previous 
     */
    save(){
        const fs = require('fs');
        let filename = `campaigns/cmpn_1/${this.name}.txt`;
        fs.writeFileSync(filename, `player: ${this.player}\n`);
        fs.appendFileSync(filename, `Name: ${this.name}  | Race: ${this.race} | Class: ${this.class}\n`);
        fs.appendFileSync(filename, `Level: ${this.level}     | XP: ${this.xp}     | Inspiration: ${this.inspiration}\n`);
        fs.appendFileSync(filename, `HP: ${this.hp}    | Proficiency: ${this.proficiency} | Armor Class: ${this.armor}\n`);
        fs.appendFileSync(filename, `\n`);
        fs.appendFileSync(filename, `Strength: ${this.strength}      | Modifier: ${this.strMod} | Save: ${this.strSave} (p)\n`);
        fs.appendFileSync(filename, `Dexterity: ${this.dexterity}    | Modifier: ${this.dexMod} | Save: ${this.dexSave} (p)\n`);
        fs.appendFileSync(filename, `Constitution: ${this.constitution} | Modifier: ${this.conMod} | Save: ${this.conSave}\n`);
        fs.appendFileSync(filename, `Intelect: ${this.intelect}     | Modifier: ${this.intMod} | Save: ${this.intSave}\n`);
        fs.appendFileSync(filename, `Wisdom: ${this.wisdom}       | Modifier: ${this.wisMod} | Save: ${this.wisSave}\n`);
        fs.appendFileSync(filename, `Charisma: ${this.charisma}     | Modifier: ${this.chaMod} | Save: ${this.chaSave}\n`);
        console.log("character saved to file");
    }
}
exports.Character = Character;