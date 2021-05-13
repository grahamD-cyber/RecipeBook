const pool = require("../dbConfig")

const listAllRecipeNames = async function(sort = 0) {
    // promise - checkout a client

    var query = 'SELECT "idMeal","mealName" FROM public."Recipe" ORDER BY "mealName"'
    var sortType = ""
    if (sort == 1) {
        sortType = "ASC"
    } else if (sort == -1) {
        sortType = "DESC"
    }
    query = query + " " + sortType;
    const { rows } = await pool.query(query)
    return rows;
}

const listAllRecipes = async function(sort = 0) {
    // promise - checkout a client

    var query = 'SELECT * FROM public."Recipe" ORDER BY "idMeal"'
    var sortType = ""
    if (sort == 1) {
        sortType = "ASC"
    } else if (sort == -1) {
        sortType = "DESC"
    }
    query = query + " " + sortType;
    const { rows } = await pool.query(query)
    return rows;
}

const getRecipeById = async function(recipeId) {
    const query = {
        text: 'SELECT * FROM public."Recipe" WHERE "idMeal" = $1',
        values: [recipeId]
    }
    const { rows } = await pool.query(query)
    return rows;
}

const searchRecipeByName = async function(recipeName) {
    // promise - checkout a client
    var results = [];
    if (typeof recipeName != "string") {
        throw("The given recipeName is invalid");
    }
    const query = {
        text: `SELECT * FROM public."Recipe" WHERE UPPER("mealName") like UPPER('%${recipeName}%')`
    }
    const { rows } = await pool.query(query)
    return rows;
}

const addRecipe = async function(recipeData) {

}

const updateRecipe = async function(recipeId) {
    
}

const deleteRecipe = async function(recipeId) {
    
}

module.exports = { listAllRecipeNames, listAllRecipes, getRecipeById, searchRecipeByName, addRecipe, updateRecipe, deleteRecipe }