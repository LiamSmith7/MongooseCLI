const Person = require("./model");

const createObj = (name, age) => {
    let query = {};
    if(name) query.name = name;
    if(age) query.age = age;
    return query;
}

exports.add = async (name, age) => {
    try{
        return await Person.create({name, age}); // same as {name: name, age: age}
    } catch (error) {
        console.log(error);
    }
}

exports.list = async (name, age) => {
    let query = createObj(name, age);
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
    let update = createObj(newName, newAge);
    try{
        return await Person.updateOne({name}, update);
    } catch (error) {
        return error;
    }
}