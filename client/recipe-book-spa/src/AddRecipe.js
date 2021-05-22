import React, { Component } from "react";
import "./css/addStyles.css";
import DropdownButton from "./DropdownButton.js";
import RecipeApi from "./services/RecipeApi";

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.newIngredient = this.newIngredient.bind(this);
    this.submitData = this.submitData.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.changeRegion = this.changeRegion.bind(this);
    this.changeType = this.changeType.bind(this);
    this.state = {
      mealName: "",
      Instructions: "",
      mealThumbnail: "",
      Tags: "",
      Youtube: "",
      mainCategory: "Choose a Category",
      mainRegion: "Choose a Region",
      mainType: "Choose a Type",
      ingredientBlocks: [4],
      numIngredients: 4,
      finalBlocks: [],
      newIngredientButton: "newIngredient",
      ingredients: {},
      measures: {}
    };
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  ingredientsChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    var ingredientObj = this.state.ingredients
    ingredientObj[nam] = val
    this.setState({ingredients: ingredientObj})
  }

  measuresChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    var measuresObj = this.state.measures
    measuresObj[nam] = val
    this.setState({measures: measuresObj})
  }

  changeCategory(newValue) {
    this.setState({ mainCategory: newValue });
  }

  changeType(newValue) {
    this.setState({ mainType: newValue });
  }

  changeRegion(newValue) {
    this.setState({ mainRegion: newValue });
  }

  newIngredient(event)
  {
    if (this.state.numIngredients <= 20)
    {
      
      // this.setState({ ingredientBlocks: this.state.ingredientBlocks.push(this.state.numRecipes)})
      const slides = this.state.ingredientBlocks.map((item) => {
        return (
          <div id = {`ingredientContainer${item}`} className = "ingredientContainer">
              <input name = {`ingredient${item}`} value = {this.state.ingredients[`ingredient"${item}`]} onChange={this.ingredientsChangeHandler} className = "text-center ingredientInput" placeholder = {`Ingredient ${item}`}></input>
              <span><input name = {`measure${item}`} value = {this.state.measures[`measure"${item}`]} onChange={this.measuresChangeHandler} className = "text-center measureInput" placeholder = "Measure/Units"></input></span>
          </div>
        );
      });
      if (this.state.numIngredients === 4){
        const newNum = this.state.numIngredients + 1
        this.setState({
        numIngredients: newNum,
        ingredientBlocks: [newNum],
        finalBlocks: slides});
      }
      else
      {
        const newNum = this.state.numIngredients + 1
        var newBlocks = this.state.finalBlocks
        newBlocks = newBlocks.concat(slides)
        this.setState({
        numIngredients: newNum,
        ingredientBlocks: [newNum],
        finalBlocks: newBlocks});
        if (this.state.numIngredients === 20)
        {
          this.setState({newIngredientButton: "newIngredientGone"})
        }
      }

    } 
    event.preventDefault();
  }

  getIngredientsOrMeasure(recipeData, parentArray, fieldName) {
    for (var i = 1; i <= 20; i++) {
      const fullFieldName = fieldName + i;
      if (parentArray[fullFieldName] != null) {
        // if ingredient value present add to recipe Object
        recipeData[fullFieldName] = parentArray[fullFieldName]
      } else {
        // if no ingredient value present set as blank
        recipeData[fullFieldName] = "";
      }
    }
  }

  submitData = (event) => {
    event.preventDefault();

    var recipeData = {};
    recipeData.mealName = this.state.mealName ? this.state.mealName : "";
    this.getIngredientsOrMeasure(recipeData, this.state.ingredients, "ingredient");
    this.getIngredientsOrMeasure(recipeData, this.state.measures, "measure");
    recipeData.mealThumbnail = this.state.mealThumbnail ? this.state.mealThumbnail : "";
    recipeData.Instructions = this.state.Instructions ? this.state.Instructions : "";
    recipeData.Tags = this.state.Tags ? this.state.Tags : "";
    recipeData.Region = this.state.mainRegion ? this.state.mainRegion : "";
    recipeData.Category = this.state.mainCategory ? this.state.mainCategory : "";
    recipeData.Type = this.state.mainType ? this.state.mainType : "";

    RecipeApi.post("/api/addRecipe", recipeData).then((response) => {
      if (response && response.data && Array.isArray(response.data.data.recipes) && response.data.data.recipes[0].idMeal) {
        var id = response.data.data.recipes[0].idMeal;

        // Redirect to Page that displays newly created Recipe
        this.props.history.push(`/recipe/${id}`)
      }
    });
  };

  render() {

    return (
      <div className = "contentContainer">
        <div className = "spatulaContainer">
            <img className = "spatula" alt="SpatulaImg" src = "/images/spatulaImage.png"/>
        </div>
        <div className = "mainAddRecipeContainer">
          <h1 className = "text-center">Add Recipe.</h1>
          <form method="POST" onSubmit={this.submitData}>
            <input name = "mealName"  required value={this.state.mealName} onChange={this.changeHandler} className = "text-center mainInput" placeholder = "Recipe Name"></input>
            <div id = "ingredientContainer1" className = "ingredientContainer">
              <input name = "ingredient1" required value={this.state.ingredients[`ingredient1`]} onChange={this.ingredientsChangeHandler} className = "text-center ingredientInput" placeholder = "Ingredient 1"></input>
              <span><input name = "measure1" value={this.state.measures[`measure1`]} onChange={this.measuresChangeHandler} className = "text-center measureInput" placeholder = "Measure/Units"></input></span>
            </div>
            <div id = "ingredientContainer2" className = "ingredientContainer">
              <input name = "ingredient2" value = {this.state.ingredients[`ingredient2`]} onChange={this.ingredientsChangeHandler} className = "text-center ingredientInput" placeholder = "Ingredient 2"></input>
              <span><input name = "measure2" value = {this.state.measures[`measure2`]} onChange={this.measuresChangeHandler} className = "text-center measureInput" placeholder = "Measure/Units"></input></span>
            </div>
            <div id = "ingredientContainer3" className = "ingredientContainer">
              <input name = "ingredient3" value = {this.state.ingredients[`ingredient3`]} onChange={this.ingredientsChangeHandler} className = "text-center ingredientInput" placeholder = "Ingredient 3"></input>
              <span><input name = "measure3" value = {this.state.measures[`measure3`]} onChange={this.measuresChangeHandler} className = "text-center measureInput" placeholder = "Measure/Units"></input></span>
            </div>
            {this.state.finalBlocks}
            <div id = "moreIngredients" className = "moreIngredients"></div>
            <button type="button" id = "newIngredientButton" className = {this.state.newIngredientButton} onClick={this.newIngredient}>+ Add Ingredient</button>
            <textarea name = "Instructions" required value={this.state.Instructions} onChange={this.changeHandler} className = "directionsInput" placeholder = "Preparation Instructions"></textarea>
            <div className = "mainInput">
                <input name = "mealThumbnail" required value={this.state.mealThumbnail} onChange={this.changeHandler} className = "text-center mainInput urlInput" placeholder = "Enter URL for Recipe Image"></input>
                <img className = "uploadImage" alt = "upload" src = "../images/photoIcon.png"/>
            </div>
            <DropdownButton mainText = {this.state.mainCategory} changeData={this.changeCategory.bind(this)} id = "Category" className = {"category"} dropdown = {"categoryDropdown"} dropdownContainer = {"categoryDropdownContainer"} mainButton={"categoryMain"} categories = {["Appetizers", "Beverages", "Soups","Salads", "Vegetables","Main Dishes","Breads", "Rolls","Desserts", "Sides", "Miscellaneous"]} imageId = "categoryImage" image = {"../images/categoryIcon.png"}/>
            <DropdownButton mainText = {this.state.mainRegion} changeData={this.changeRegion.bind(this)} id = "Region" className = {"region"} dropdown = {"regionDropdown"} dropdownContainer = {"regionDropdownContainer"} mainButton={"regionMain"} categories = {["Turkish","Italian","Chinese","Jamaican","Dutch","American","Tunisian","Spanish","Japanese","Canadian","Indian","Vietnamese","Portuguese","Moroccan","Unknown","Irish","French","Mexican","Thai","Malaysian","Kenyan","British","Egyptian","Greek","Polish","Russian"]} imageId = "regionImage" image = {"../images/regionIcon.png"}/>
            <DropdownButton mainText = {this.state.mainType} changeData={this.changeType.bind(this)} id = "Type" className = {"type"} dropdown = {"typeDropdown"} dropdownContainer = {"typeDropdownContainer"} mainButton={"typeMain"} categories = {["Vegetarian", "Non-Vegetarian"]} imageId = "typeImage" image = {"../images/typeIcon.png"}/>
            <div className = "mainInput">
                <input name = "Tags" value={this.state.Tags} onChange={this.changeHandler} className = "mainInput tagsInput" placeholder = "Tags e.g.(chicken, pie, carrots, etc.)"></input>
                <img className = "uploadImage" alt = "tags" src = "../images/tagIcon.png"/>
            </div>
            <div className = "mainInput">
                <input name = "Youtube" value={this.state.Youtube} onChange={this.changeHandler} type = "url" className = "text-center mainInput youtubeInput" placeholder = "YouTube URL"></input>
                <img className = "uploadImage" alt = "video" src = "../images/videoIcon.png"/>
            </div>
            {/* <Tag/> */}
          
            <button id = "submitButton" className = "text-center submitButton" type="submit">Submit Recipe</button>
          </form>
        </div>
      </div>
    );
  }
}
 
export default AddRecipe;