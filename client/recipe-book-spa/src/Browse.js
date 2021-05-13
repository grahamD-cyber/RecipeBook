import React, { Component } from "react";
import {
  NavLink,
  HashRouter
} from "react-router-dom";
import RecipeApi from "./services/RecipeApi";

class Browse extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
  };

  componentDidMount() {
    RecipeApi.get("/api/listAllRecipeNames/1").then(
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
      const group = items.data.recipes.reduce((r, e) => {
          const key = e.mealName[0];
          if (!r[key]) r[key] = [];
          r[key].push(e);
          return r;
      }, {});

      return (
        <HashRouter>
        <div className="recipe-List">
          <div>
          <h1> Browse All Recipes </h1>
          {Object.entries(group).map(([key, value], i) => {
            return (
              <div className="recipe-Block" key={i}>
                <div className="recipe-key"><strong>{key}</strong></div>
                {value.map((item, j) => (
                 <div className="recipe-Name" key={j}><NavLink to={`/recipe/${item.idMeal}`}>{item.mealName}</NavLink></div>
                ))}
              </div>
            );
          })}
        </div>
        </div>
        </HashRouter>
      );
    }
  }
}

export default Browse;
