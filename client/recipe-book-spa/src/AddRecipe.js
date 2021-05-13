import React, { Component } from "react";
import "./css/addStyles.css";
import DropdownButton from "./DropdownButton.js";

class AddRecipe extends Component {
  constructor(props){
    super(props);
    this.getData = this.getData.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.changeRegion = this.changeRegion.bind(this);
    this.changeType = this.changeType.bind(this);
    this.state = {
      mainCategory: "Choose a Category",
      mainRegion: "Choose a Region",
      mainType: "Choose a Type"
    };
  }
  changeCategory(newValue) {
      this.setState({mainCategory : newValue});
  }

  changeType(newValue) {
    this.setState({mainType : newValue});
  
  }

  changeRegion(newValue) {
    this.setState({mainRegion : newValue});
  }

  getData(){
    console.log("mealName: " + document.getElementById("mealName").value)
    for (var i = 1; i <= 20; i++)
    {
      const id = "ingredient" + i
      const name = "ingredient " + i + ": "
      if (document.getElementById(id) != null)
      {
        console.log(name + document.getElementById(id).value)
      }
      else 
      {
        console.log(name + "null")
      }
    }
    console.log("Youtube: " + document.getElementById("Youtube").value)
    console.log("Tags: " + document.getElementById("Tags").value)
    console.log("Instructions: " + document.getElementById("Instructions").value)
    console.log("Region: " + this.state.mainRegion)
    console.log("Category: " + this.state.mainCategory)
    console.log("Type: " + this.state.mainType)
    for (var j = 1; j <= 20; j++)
    {
      const id = "measure" + j
      const name = "measure" + j + ": "
      if (document.getElementById(id) != null)
      {
        console.log(name + document.getElementById(id).value)
      }
      else 
      {
        console.log(name + "null")
      }
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
        <span><input id = "measure${num}" class = "text-center measureInput" placeholder = "Measure/Units"></input></span>`;
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
        <DropdownButton mainText = {this.state.mainCategory} changeData={this.changeCategory.bind(this)} id = "Category" class = {"category"} dropdown = {"categoryDropdown"} dropdownContainer = {"categoryDropdownContainer"} mainButton={"categoryMain"} categories = {["Appetizers", "Beverages", "Soups","Salads", "Vegetables","Main Dishes","Breads", "Rolls","Desserts", "Sides", "Miscellaneous"]} imageId = "categoryImage" image = {"../images/categoryIcon.png"}/>
        <DropdownButton mainText = {this.state.mainRegion} changeData={this.changeRegion.bind(this)} id = "Region" class = {"region"} dropdown = {"regionDropdown"} dropdownContainer = {"regionDropdownContainer"} mainButton={"regionMain"} categories = {["Turkish","Italian","Chinese","Jamaican","Dutch","American","Tunisian","Spanish","Japanese","Canadian","Indian","Vietnamese","Portuguese","Moroccan","Unknown","Irish","French","Mexican","Thai","Malaysian","Kenyan","British","Egyptian","Greek","Polish","Russian"]} imageId = "regionImage" image = {"../images/regionIcon.png"}/>
        <DropdownButton mainText = {this.state.mainType} changeData={this.changeType.bind(this)} id = "Type" class = {"type"} dropdown = {"typeDropdown"} dropdownContainer = {"typeDropdownContainer"} mainButton={"typeMain"} categories = {["Vegetarian", "Non-Vegetarian"]} imageId = "typeImage" image = {"../images/typeIcon.png"}/>
        <input id = "Tags" class = "mainInput tagsInput" placeholder = "Tags e.g.(chicken, pie, carrots, etc.)"></input>
        <div class = "mainInput">
            <input id = "Youtube" type = "url" class = "text-center mainInput youtubeInput" placeholder = "YouTube URL"></input>
            <img class = "uploadImage" alt = "video" src = "../images/videoIcon.png"/>
        </div>
        {/* <Tag/> */}
       
        <button id = "submitButton" class = "text-center submitButton" onClick = {this.getData}>Submit Recipe</button>
      </div>
    );
  }
}
 
export default AddRecipe;