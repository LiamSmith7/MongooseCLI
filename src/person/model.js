const mongoose = require("mongoose");

const Person = mongoose.model("Individual", new mongoose.Schema(
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
));

module.exports = Person;