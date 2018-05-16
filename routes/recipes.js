var express = require('express');
var Recipe = require('../mongo_schema');
var router = express.Router();

/* GET recipes page. */
router.get('/', function (req, res, next) {
    Recipe.find({}, function (err, recipes) {
        if (err) {
            console.log("error");
        }
        else {
            res.render('recipes', {data: recipes});
        }
    });
});

router.post('/', function (req, res, next) {
    var new_recipe_name = req.body.recipe_name;
    var new_recipe_img = req.body.recipe_img;
    var new_recipe_desc = req.body.recipe_desc;

    Recipe.create({
        name: new_recipe_name,
        image: new_recipe_img,
        description: new_recipe_desc
    }, function (err, recipe) {
        if (err) {
            console.log("error");
        }
        else {
            console.log("Added recipe");
            console.log(recipe);
        }
    });

    res.redirect("/recipes");
});

router.get('/new', function (req, res, next) {
    res.render('new_recipe');
});


router.get('/:id', function (req, res, next) {
    Recipe.findById(req.params.id, function (err, foundRecipe) {
        if (err || foundRecipe == null) {
            console.log("error");
            next(createError(404));
        }
        else {
            res.render('recipe', {recipe: foundRecipe});
        }
    })
});

module.exports = router;
