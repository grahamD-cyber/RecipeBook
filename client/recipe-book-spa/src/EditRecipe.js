import React, { Component } from "react";
import "./css/addStyles.css";
import DropdownButton from "./DropdownButton.js";
import RecipeApi from "./services/RecipeApi";
import {Animated, Easing } from 'react-native';

class EditRecipe extends Component {
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
      id: "",
      spinAnim: new Animated.Value(0)
    };
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    console.log(val)
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

  componentDidMount() {
    Animated.loop(Animated.timing(
      this.state.spinAnim,
    {
      toValue: 100,
      duration: 300000,
      easing: Easing.linear,
      useNativeDriver: true
    }
  )).start();
    var id = this.props.match.params.recipeId;
    var api = "/api/getRecipeById/" + id;
    RecipeApi.get(api).then(
      (result) => {
        let recipe = result.data.data.recipes[0]
        let finalTag = ""
        let newCategory = this.state.mainCategory
        let newRegion = this.state.mainRegion
        let newType = this.state.mainType
        if (recipe.Tags !== null)
        {
            finalTag = recipe.Tags.replaceAll(",",", ")
        }
        if (recipe.Category !== null)
        {
            newCategory = recipe.Category
        }
        if (recipe.Region !== null)
        {
            newRegion = recipe.Region
        }
        if (recipe.Type !== null)
        {
            newType = recipe.Type
        }
        this.setState({
            isLoaded: true,
            items: result.data,
            mealName: recipe.mealName,
            Instructions: recipe.Instructions,
            mealThumbnail: recipe.mealThumbnail,
            Tags: finalTag,
            Youtube: recipe.Youtube,
            mainCategory: newCategory,
            mainRegion: newRegion,
            mainType: newType,
            id: recipe.idMeal
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }
  submitData = (event) => {
    event.preventDefault();
    console.log("SUBMITTT")
    var recipeData = {};
    recipeData.mealName = this.state.mealName ? this.state.mealName : "";
    this.getIngredientsOrMeasure(recipeData, "ingredient");
    this.getIngredientsOrMeasure(recipeData, "measure");
    recipeData.mealThumbnail = this.state.mealThumbnail ? this.state.mealThumbnail : "";
    recipeData.Instructions = this.state.Instructions ? this.state.Instructions : "";
    recipeData.Tags = this.state.Tags ? this.state.Tags : "";
    if (this.state.mainRegion === "Choose a Region")
    {
        recipeData.Region = ""
    }
    else
    {
        recipeData.Region = this.state.mainRegion
    }
    if (this.state.mainCategory === "Choose a Category")
    {
        recipeData.Category = ""
    }
    else
    {
        recipeData.Category = this.state.mainCategory
    }
    if (this.state.mainType === "Choose a Type")
    {
        recipeData.Type = ""
    }
    else
    {
        recipeData.Type = this.state.mainType
    }

    const test = `/api/updateRecipe/${this.state.id}`
    console.log(test)

    RecipeApi.put(`/api/updateRecipe/${this.state.id}`, recipeData).then((response) => {
    //   if (response && response.data && Array.isArray(response.data.data.recipes) && response.data.data.recipes[0].idMeal) {
    //     // var id = response.data.data.recipes[0].idMeal;
    //     // Redirect to Page that displays newly created Recipe
    //     console.log("LKJSDFLKJDSFLKJSDFLKJSDFLKJSDFLKJSDFLKJSD")
        this.props.history.push(`/recipe/${this.state.id}`)

    });
  };

  render() {

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
    const spin = this.state.spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      });
      const carrotStyle  = {
        transform: [{rotate: spin}],
        position: "absolute",
        top: "5vw",
        left: "5vw",
        right: "5vw",
        bottom: "5vw",
        height: "10vw",
        width: "10vw"
      }
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div class = "text-center errorMessage">Error: {error.message}</div>;
      } else if (!isLoaded) {
        return (
        <div>
          <div className = "loadingContainer">
              <img className = "plate" src = "../images/loadingIcon.png" alt = "background"/>
              <Animated.Image style={carrotStyle} source = "../images/ingredientIcon3.png" alt = "carrot"/>
          </div>
          <h1 className = "text-center loadingText">Awaiting Yumminess</h1>
  
        </div>);
      } else {
          
        if (items && items.data && items.data.recipes) 
        {
            if (Array.isArray(items.data.recipes))
            {
                var recipe = items.data.recipes[0];
            }
        }
        var makeIngredients = [];
        var item1 =  eval("recipe.ingredient" + 1)
        var i = 1;
        while (item1 !== null && item1 !== "" && i <= 20) {
              const item2 =  eval("recipe.measure" + i)
              const ingredientId = ("ingredient" + i)
              const measureId = ("measure" + i)
              const divId = ("ingredientContainer" + i)
              makeIngredients.push(<div id = {divId} className = "ingredientContainer">
              <input id = {ingredientId} className = "text-center ingredientInput" defaultValue = {item1}></input>
              <span><input id = {measureId} className = "text-center measureInput" defaultValue = {item2}></input></span>
              </div>);
              i = i + 1;
              item1 =  eval("recipe.ingredient" + i)
        }
        var numIngredients = i;

        return (
        <div className = "contentContainer">
            <div className = "spatulaContainer">
                <img className = "spatula" alt="SpatulaImg" src = "/images/spatulaImage.png"/>
            </div>
            <div className = "mainAddRecipeContainer">
            <h1 className = "text-center">Edit Recipe.</h1>
            <form method="POST" onSubmit={this.submitData}>
                <input name = "mealName" onChange={this.changeHandler} className = "text-center mainInput" type="text" defaultValue={this.state.mealName}></input>
                {makeIngredients}
                <div id = "moreIngredients" className = "moreIngredients"></div>
                <button type="button" id = "newIngredientButton" className = "newIngredient" onClick={newIngredientClicked}>+ Add Ingredient</button>
                <textarea name = "Instructions" required onChange={this.changeHandler} className = "directionsInput" type = "text" defaultValue = {this.state.Instructions}></textarea>
                <div className = "mainInput">
                    <input name = "mealThumbnail" defaultValue={this.state.mealThumbnail} onChange={this.changeHandler} className = "text-center mainInput youtubeInput"></input>
                    <img className = "uploadImage" alt = "upload" src = "../images/photoIcon.png"/>
                </div>
                <DropdownButton mainText = {this.state.mainCategory} changeData={this.changeCategory.bind(this)} id = "Category" className = {"category"} dropdown = {"categoryDropdown"} dropdownContainer = {"categoryDropdownContainer"} mainButton={"categoryMain"} categories = {["Appetizers", "Beverages", "Soups","Salads", "Vegetables","Main Dishes","Breads", "Rolls","Desserts", "Sides", "Miscellaneous"]} imageId = "categoryImage" image = {"../images/categoryIcon.png"}/>
                <DropdownButton mainText = {this.state.mainRegion} changeData={this.changeRegion.bind(this)} id = "Region" className = {"region"} dropdown = {"regionDropdown"} dropdownContainer = {"regionDropdownContainer"} mainButton={"regionMain"} categories = {["Turkish","Italian","Chinese","Jamaican","Dutch","American","Tunisian","Spanish","Japanese","Canadian","Indian","Vietnamese","Portuguese","Moroccan","Unknown","Irish","French","Mexican","Thai","Malaysian","Kenyan","British","Egyptian","Greek","Polish","Russian"]} imageId = "regionImage" image = {"../images/regionIcon.png"}/>
                <DropdownButton mainText = {this.state.mainType} changeData={this.changeType.bind(this)} id = "Type" className = {"type"} dropdown = {"typeDropdown"} dropdownContainer = {"typeDropdownContainer"} mainButton={"typeMain"} categories = {["Vegetarian", "Non-Vegetarian"]} imageId = "typeImage" image = {"../images/typeIcon.png"}/>
                <div className = "mainInput">
                    <input name = "Tags" defaultValue={this.state.Tags} onChange={this.changeHandler} className = "mainInput tagsInput"></input>
                    <img className = "uploadImage" alt = "tags" src = "../images/tagIcon.png"/>
                </div>
                <div className = "mainInput">
                    <input name = "Youtube" defaultValue={this.state.Youtube} onChange={this.changeHandler} type = "url" className = "text-center mainInput youtubeInput"></input>
                    <img className = "uploadImage" alt = "video" src = "../images/videoIcon.png"/>
                </div>
                {/* <Tag/> */}
            
                <button id = "submitButton" className = "text-center submitButton" type="submit">Update Recipe</button>
            </form>
            </div>
        </div>
        );
      }
  }
}
 
export default EditRecipe;