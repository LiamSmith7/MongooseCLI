exports.add = async (dbObj, var1, var2) => {
    try{
        return await dbObj.model.create(dbObj.createObj(var1, var2));
    } catch (error) {
        console.log(error);
    }
}

exports.list = async (dbObj, var1, var2) => {
    let query = (var1 || var2) ? dbObj.createObj(var1, var2) : {};
    try {
        return await dbObj.model.find(query);
    } catch (error) {
        return error;
    }
}

exports.remove = async(dbObj, name) => {
    try{
        return await dbObj.model.deleteOne({name});
    } catch (error) {
        return error;
    }
}

exports.update = async(dbObj, name, var1, var2) => {
    let update = dbObj.createObj(var1, var2);
    try{
        return await dbObj.model.updateOne({name}, update);
    } catch (error) {
        return error;
    }
}