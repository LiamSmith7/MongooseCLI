require("./db/connection");
const { default: mongoose } = require("mongoose");
const yargs = require("yargs");
const {add, list, remove, update} = require("./person/functions");

const app = async (yargsObj) => {
    try{
        if(yargsObj.add){
            if(yargsObj.name)
                console.log(await add(yargsObj.name, yargsObj.age || "Unknown"));
            else
                console.log("You must provide the name of the person you want to add.");
        }
        else if(yargsObj.list){
            console.log(await list(yargsObj.name, yargsObj.age));
        }
        else if(yargsObj.remove){
            if(yargsObj.name)
                console.log(await remove(yargsObj.name));
            else
                console.log("You must provide the name of the person you want to remove.")
        }
        else if(yargsObj.update){
            if(yargsObj.name)
                console.log(await update(yargsObj.name, yargsObj["new-name"], yargsObj["new-age"]));
            else
                console.log("You must provide the name of the person you want to update.");
        }
        else if(yargsObj["?"]){
            console.log("Options: ")
            console.log("   --add           Add a person");
            console.log("   --list          Lists a person");
            console.log("   --update        Lists a person");
            console.log("   --remove        Deletes a person")
            console.log("   --?             Displays commands");
            console.log("\nParameters:");
            console.log("   --name          Name of the person (--add, --remove, --update --list)");
            console.log("   --age           Age of the person (--add --list)");
            console.log("   --new-name      Updated name of the person (--update)");
            console.log("   --new-age       Updated age of the person (--update)");
        }
        else {
            console.log("Unknown command.");
        }
    } catch(error) {
        console.log(error);
    }
    await mongoose.disconnect();
};

app(yargs.argv);