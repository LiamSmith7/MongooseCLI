const mongoose = require("mongoose");

const defaultObj = name => {
    let obj = {};
    if(name) obj.name = name;
    return obj;
}

const Person = {
    model: mongoose.model("Individual", new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                unique: true
            },
            age: {
                type: String,
                required: true,
                default: "Unknown"
            }
        }
    )),
    createObj: (name, age) => {
        let obj = defaultObj(name);
        if(age) obj.age = age;
        return obj;
    }
};

const Location = {
    model: mongoose.model("Location", new mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            },
            population: {
                type: String,
                required: true,
                default: "Unknown"
            }
        }
    )),
    createObj: (name, population) => {
        let obj = defaultObj(name);
        if(population) obj.population = population;
        return obj;
    }
}

module.exports = {Person, Location};