import React, { Component } from "react";
import "./css/addStyles.css";
import DropdownButton from "./DropdownButton.js";
import RecipeApi from "./services/RecipeApi";

class AddRecipe extends Component {
  constructor(props) {
    super(props);
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
    };
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  changeCategory(newValue) {
    this.setState({ mainCategory: newValue });
  }

  changeType(newValue) {
    this.setState({ mainType: newValue });
  }

  changeRegion(newValue) {
    this.setState({ mainRegion: newValue });
  }

  getIngredientsOrMeasure(recipeData, fieldName) {
    for (var i = 1; i <= 20; i++) {
      const id = fieldName + i;
      if (document.getElementById(id) != null) {
        // if ingredient value present add to recipe Object
        recipeData[id] = document.getElementById(id).value;
      } else {
        // if no ingredient value present set as blank
        recipeData[id] = "";
      }
    }
  }

  submitData = (event) => {
    event.preventDefault();

    var recipeData = {};
    recipeData.mealName = this.state.mealName ? this.state.mealName : "";
    this.getIngredientsOrMeasure(recipeData, "ingredient");
    this.getIngredientsOrMeasure(recipeData, "measure");
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
    var numIngredients = 4;

    function newIngredientClicked() {
      if (numIngredients <= 20) {
        const div = document.createElement("div");
        div.classList.add("ingredientContainer");
        var num = String(numIngredients);
        div.innerHTML = `<input id = "ingredient${num}" class = "text-center ingredientInput" placeholder = "Ingredient ${num}"></input>
        <span><input id = "measure${num}" class = "text-center measureInput" placeholder = "Measure/Units"></input></span>`;
        document.querySelector(".moreIngredients").appendChild(div);
        numIngredients = numIngredients + 1;
      } else {
        const div = document.createElement("div");
        document
          .getElementById("newIngredientButton")
          .classList.add("newIngredientGone");
        document
          .getElementById("newIngredientButton")
          .classList.remove("newIngredient");
        div.innerHTML = `<h2 class = "text-center">Only 20 Ingredients Allowed.</h2>`;
        document.querySelector(".moreIngredients").appendChild(div);
      }
    }

    return (

      <div className = "mainAddRecipeContainer">
        <h1 className = "text-center">Add Recipe.</h1>
        <form method="POST" onSubmit={this.submitData}>
        <input name = "mealName" value={this.state.mealName} onChange={this.changeHandler} className = "text-center mainInput" placeholder = "Recipe Name"></input>
        <div id = "ingredientContainer1" className = "ingredientContainer">
          <input id = "ingredient1" className = "text-center ingredientInput" placeholder = "Ingredient 1"></input>
          <span><input id = "measure1" className = "text-center measureInput" placeholder = "Measure/Units"></input></span>
        </div>
        <div id = "ingredientContainer2" className = "ingredientContainer">
          <input id = "ingredient2" className = "text-center ingredientInput" placeholder = "Ingredient 2"></input>
          <span><input id = "measure2" className = "text-center measureInput" placeholder = "Measure/Units"></input></span>
        </div>
        <div id = "ingredientContainer3" className = "ingredientContainer">
          <input id = "ingredient3" className = "text-center ingredientInput" placeholder = "Ingredient 3"></input>
          <span><input id = "measure3" className = "text-center measureInput" placeholder = "Measure/Units"></input></span>
        </div>
        <div id = "moreIngredients" className = "moreIngredients"></div>
        <button id = "newIngredientButton" className = "newIngredient" onClick={newIngredientClicked}>+ Add Ingredient</button>
        <textarea name = "Instructions" value={this.state.Instructions} onChange={this.changeHandler} className = "directionsInput" placeholder = "Preparation Instructions"></textarea>
        <div className = "mainInput">
            <input name = "mealThumbnail" value={this.state.mealName} onChange={this.changeHandler} className = "text-center mainInput urlInput" placeholder = "Enter URL for Recipe Image"></input>
            <img className = "uploadImage" alt = "upload" src = "../images/photoIcon.png"/>
        </div>
        <DropdownButton mainText = {this.state.mainCategory} changeData={this.changeCategory.bind(this)} id = "Category" className = {"category"} dropdown = {"categoryDropdown"} dropdownContainer = {"categoryDropdownContainer"} mainButton={"categoryMain"} categories = {["Appetizers", "Beverages", "Soups","Salads", "Vegetables","Main Dishes","Breads", "Rolls","Desserts", "Sides", "Miscellaneous"]} imageId = "categoryImage" image = {"../images/categoryIcon.png"}/>
        <DropdownButton mainText = {this.state.mainRegion} changeData={this.changeRegion.bind(this)} id = "Region" className = {"region"} dropdown = {"regionDropdown"} dropdownContainer = {"regionDropdownContainer"} mainButton={"regionMain"} categories = {["Turkish","Italian","Chinese","Jamaican","Dutch","American","Tunisian","Spanish","Japanese","Canadian","Indian","Vietnamese","Portuguese","Moroccan","Unknown","Irish","French","Mexican","Thai","Malaysian","Kenyan","British","Egyptian","Greek","Polish","Russian"]} imageId = "regionImage" image = {"../images/regionIcon.png"}/>
        <DropdownButton mainText = {this.state.mainType} changeData={this.changeType.bind(this)} id = "Type" className = {"type"} dropdown = {"typeDropdown"} dropdownContainer = {"typeDropdownContainer"} mainButton={"typeMain"} categories = {["Vegetarian", "Non-Vegetarian"]} imageId = "typeImage" image = {"../images/typeIcon.png"}/>
        <input name = "Tags" value={this.state.Tags} onChange={this.changeHandler} className = "mainInput tagsInput" placeholder = "Tags e.g.(chicken, pie, carrots, etc.)"></input>
        <div className = "mainInput">
            <input name = "Youtube" value={this.state.Youtube} onChange={this.changeHandler} type = "url" className = "text-center mainInput youtubeInput" placeholder = "YouTube URL"></input>
            <img className = "uploadImage" alt = "video" src = "../images/videoIcon.png"/>
        </div>
        {/* <Tag/> */}
       
        <button id = "submitButton" className = "text-center submitButton" type="submit">Submit Recipe</button>
        </form>
      </div>
    );
  }
}
 
export default AddRecipe;