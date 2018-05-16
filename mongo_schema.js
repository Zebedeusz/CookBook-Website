var mongoose = require("mongoose");

var recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
