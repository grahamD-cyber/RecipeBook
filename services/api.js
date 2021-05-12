const pool = require("../dbConfig")

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
    const { rows } = await pool.simpleQuery(query)
    return rows;
}

const getRecipeById = async function(recipeId) {
    // promise - checkout a client
    if (typeof recipeId != "number") {
        throw("The given recipeId is not a number");
    }
    const query = {
        text: 'SELECT * FROM public."Recipe" WHERE "idMeal" = $1',
        values: [recipeId]
    }
    const { rows } = await pool.query(query)
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

module.exports = { listAllRecipes, getRecipeById, searchRecipeByName }