const Person = require("./model");

exports.add = async (name, age) => {
    try{
        return await Person.create({name, age}); // same as {name: name, age: age}
    } catch (error) {
        console.log(error);
    }
}

exports.list = async (name, age) => {

    let query = {};
    if(name) query.name = name;
    if(age) query.age = age;

    try {
        return await Person.find(query);
    } catch (error) {
        return error;
    }
}

exports.remove = async(name) => {
    try{
        return await Person.deleteOne({name});
    } catch (error) {
        return error;
    }
}

exports.update = async(name, newName, newAge) => {
    let update = {};
    if(newName) update.name = newName;
    if(newAge) update.age = newAge;
    try{
        return await Person.updateOne({name}, update);
    } catch (error) {
        return error;
    }
}