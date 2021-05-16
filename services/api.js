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
    console.log(recipeData)
    recipeData.lastUpdate = new Date(Date.now()).toISOString();
    const query = {
        text: `INSERT INTO public."Recipe"(
            "mealThumbnail", "mealName", ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6, ingredient7, ingredient8, ingredient9, ingredient10, ingredient11, ingredient12, ingredient13, ingredient14, ingredient15, ingredient16, ingredient17, ingredient18, ingredient19, ingredient20, "Youtube", "Tags", "Instructions", "lastUpdate", "Region", "Category", measure1, measure2, measure3, measure4, measure5, measure6, measure7, measure8, measure9, measure10, measure11, measure12, measure13, measure14, measure15, measure16, measure17, measure18, measure19, measure20, "Type")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49) RETURNING "idMeal"`,
        values: [recipeData.mealThumbnail, recipeData.mealName, recipeData.ingredient1, recipeData.ingredient2, recipeData.ingredient3, recipeData.ingredient4, recipeData.ingredient5, recipeData.ingredient6, recipeData.ingredient7, recipeData.ingredient8, recipeData.ingredient9, recipeData.ingredient10, recipeData.ingredient11, recipeData.ingredient12, recipeData.ingredient13, recipeData.ingredient14, recipeData.ingredient15, recipeData.ingredient16, recipeData.ingredient17, recipeData.ingredient18, recipeData.ingredient19, recipeData.ingredient20, recipeData.Youtube, recipeData.Tags, recipeData.Instructions, recipeData.lastUpdate, recipeData.Region, recipeData.Category, recipeData.measure1, recipeData.measure2, recipeData.measure3, recipeData.measure4, recipeData.measure5, recipeData.measure6, recipeData.measure7, recipeData.measure8, recipeData.measure9, recipeData.measure10, recipeData.measure11, recipeData.measure12, recipeData.measure13, recipeData.measure14, recipeData.measure15, recipeData.measure16, recipeData.measure17, recipeData.measure18, recipeData.measure19, recipeData.measure20, recipeData.Type]
    }
    const { rows } = await pool.query(query)
    return rows;
}

const updateRecipe = async function(recipeId) {
    
}

const deleteRecipe = async function(recipeId) {
    
}

module.exports = { listAllRecipeNames, listAllRecipes, getRecipeById, searchRecipeByName, addRecipe, updateRecipe, deleteRecipe }