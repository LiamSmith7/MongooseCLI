require("./db/connection");
const { default: mongoose } = require("mongoose");
const yargs = require("yargs");
const {add, list, remove, update} = require("./person/functions");
const {Person, Location} = require("./person/model");

const app = async (yargsObj) => {
    try{
        // Grab Person info OR Location info from yargsObj
        // name / newName is universal to both Location and Person
        let name = yargsObj["name"];
        let newName = yargsObj["new-name"];

        // default = Person
        let dbObj = Person;
        let number = yargsObj["age"];
        let newNumber = yargsObj["new-age"];
        if(!yargsObj.person && yargsObj.location){
            dbObj = Location;
            number = yargsObj["population"];
            newNumber = yargsObj["new-population"];
        }

        // Add
        if(yargsObj.add || yargsObj.a){
            if(name)
                console.log(await add(dbObj, name, number));
            else
                console.log("You must provide the name of the person / location you want to add.");
        }
        // List (w/ optional query)
        else if(yargsObj.list || yargsObj.l){
            console.log(await list(dbObj, name, number));
        }
        // Remove
        else if(yargsObj.remove || yargsObj.r || yargsObj.delete || yargsObj.d){
            if(name)
                console.log(await remove(dbObj, name));
            else
                console.log("You must provide the name of the person / location you want to remove.")
        }
        // Update
        else if(yargsObj.update || yargsObj.u){
            if(name)
                console.log(await update(dbObj, name, newName, newNumber));
            else
                console.log("You must provide the name of the person / location you want to update.");
        }
        else if(yargsObj["?"] || yargsObj.h){
            console.log("Options: ")
            console.log("   --? / --h           Displays commands");
            console.log("   --add / --a         Add a person");
            console.log("   --list / --l        Lists a person");
            console.log("   --update / --u      Lists a person");
            console.log("   --remove / --r      Deletes a person")
            console.log("\nDatabases: ")
            console.log("   --person / empty    Person database (Default)");
            console.log("   --location          Location database");
            console.log("\nParameters: ");
            console.log("   --name              Name of the person / location (--add, --remove, --update --list)");
            console.log("   --age               Age of the person (--add --list)");
            console.log("   --population        Total population at the location (--add --list)");
            console.log("   --new-name          Updated name of the person (--update)");
            console.log("   --new-age           Updated age of the person (--update)");
            console.log("   --new-population    Updated age of the person (--update)");
        }
        else {
            console.log("Unknown command. Type --? or --h for help.");
        }
    } catch(error) {
        console.log(error);
    }
    await mongoose.disconnect();
};

app(yargs.argv);