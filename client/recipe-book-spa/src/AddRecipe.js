import React, { Component } from "react";
import "./css/addStyles.css";
import DropdownButton from "./DropdownButton.js";

class AddRecipe extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
}
  render() {
    var numIngredients = 4

    function newIngredientClicked() {
      if (numIngredients <= 20)
      {
        const div = document.createElement('div');
        div.classList.add('ingredientContainer');
        var num = String(numIngredients)
        div.innerHTML = `<input id = "ingredient${num}" class = "text-center ingredientInput" placeholder = "Ingredient ${num}"></input>
        <span><input id = "measure${num} class = "text-center measureInput" placeholder = "Measure/Units"></input></span>`;
        document.querySelector('.moreIngredients').appendChild(div);
        numIngredients = numIngredients + 1;
      }
      else
      {
        const div = document.createElement('div');
        document.getElementById("newIngredientButton").classList.add("newIngredientGone");
        document.getElementById("newIngredientButton").classList.remove("newIngredient");
        div.innerHTML = `<h2 class = "text-center">Only 20 Ingredients Allowed.</h2>`;
        document.querySelector('.moreIngredients').appendChild(div);
      }

    }


    return (

      <div class = "mainAddRecipeContainer">
        <h1 class = "text-center">Add Recipe.</h1>
        <input id = "mealName" class = "text-center mainInput" placeholder = "Recipe Name"></input>
        <div id = "ingredientContainer1" class = "ingredientContainer">
          <input id = "ingredient1" class = "text-center ingredientInput" placeholder = "Ingredient 1"></input>
          <span><input id = "measure1" class = "text-center measureInput" placeholder = "Measure/Units"></input></span>
        </div>
        <div id = "ingredientContainer2" class = "ingredientContainer">
          <input id = "ingredient2" class = "text-center ingredientInput" placeholder = "Ingredient 2"></input>
          <span><input id = "measure2" class = "text-center measureInput" placeholder = "Measure/Units"></input></span>
        </div>
        <div id = "ingredientContainer3" class = "ingredientContainer">
          <input id = "ingredient3" class = "text-center ingredientInput" placeholder = "Ingredient 3"></input>
          <span><input id = "measure3" class = "text-center measureInput" placeholder = "Measure/Units"></input></span>
        </div>
        <div id = "moreIngredients" class = "moreIngredients"></div>
        <button id = "newIngredientButton" class = "newIngredient" onClick={newIngredientClicked}>+ Add Ingredient</button>
        <textarea id = "Instructions" class = "directionsInput" placeholder = "Preparation Instructions"></textarea>
        <div class = "mainInput">
            <input id = "mealThumbnail"class = "text-center mainInput urlInput" placeholder = "Enter URL for Recipe Image"></input>
            <img class = "uploadImage" alt = "upload" src = "../images/photoIcon.png"/>
        </div>
        <DropdownButton id = "Category" class = {"category"} dropdown = {"categoryDropdown"} dropdownContainer = {"categoryDropdownContainer"} mainButton={"categoryMain"} categoryText = {"Select a Category"} categories = {["Appetizers", "Beverages", "Soups","Salads", "Vegetables","Main Dishes","Breads", "Rolls","Desserts", "Sides", "Miscellaneous"]} imageId = "categoryImage" image = {"../images/categoryIcon.png"}/>
        <DropdownButton id = "Region" class = {"region"} dropdown = {"regionDropdown"} dropdownContainer = {"regionDropdownContainer"} mainButton={"regionMain"} categoryText = {"Select a Region"} categories = {["Turkish","Italian","Chinese","Jamaican","Dutch","American","Tunisian","Spanish","Japanese","Canadian","Indian","Vietnamese","Portuguese","Moroccan","Unknown","Irish","French","Mexican","Thai","Malaysian","Kenyan","British","Egyptian","Greek","Polish","Russian"]} imageId = "regionImage" image = {"../images/regionIcon.png"}/>
        <DropdownButton id = "Type" class = {"type"} dropdown = {"typeDropdown"} dropdownContainer = {"typeDropdownContainer"} mainButton={"typeMain"} categoryText = {"Select a Type"} categories = {["Vegetarian", "Non-Vegetarian"]} imageId = "typeImage" image = {"../images/typeIcon.png"}/>
        <input id = "Tags" class = "mainInput tagsInput" placeholder = "Tags e.g.(chicken, pie, carrots, etc.)"></input>
        <div class = "mainInput">
            <input id = "Youtube" type = "url" class = "text-center mainInput youtubeInput" placeholder = "YouTube URL"></input>
            <img class = "uploadImage" alt = "video" src = "../images/videoIcon.png"/>
        </div>
        {/* <Tag/> */}
       
        <button id = "submitButton" class = "text-center submitButton">Submit Recipe</button>
      </div>
    );
  }
}
 
export default AddRecipe;