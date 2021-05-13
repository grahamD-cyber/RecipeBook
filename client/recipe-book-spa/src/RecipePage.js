import React, { Component } from "react";
import RecipeApi from "./services/RecipeApi";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    var id = this.props.match.params.recipeId;
    var api = "/api/getRecipeById/" + id;
    RecipeApi.get(api).then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.data,
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

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var recipe =  items.data.recipes[0];
      return (
        <div>
          <h2>{recipe.mealName}</h2>
          <img className = "recipeImage" alt="recipeImage" src = {`${recipe.mealThumbnail}`}/>
          <p>
            {recipe.Instructions}
          </p>
        </div>
      );
    }
  }
}

export default Recipe;
