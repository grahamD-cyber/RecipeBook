import React, { Component } from "react";
import { Animated, Easing } from 'react-native';
import {
  NavLink,
  HashRouter
} from "react-router-dom";

import RecipeApi from "./services/RecipeApi";

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      spinAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.spinAnim, {
        toValue: 100,
        duration: 300000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
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

  reverseList = (event) => {
    var recipeList = this.state.items.data.recipes;
    recipeList.reverse();
    this.setState({
      items: {
        data: {
          recipes: recipeList,
        },
      },
    });
    event.preventDefault();
  };

  render() {
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
    const carrotStyle = {
      transform: [{ rotate: spin }],
      position: "absolute",
      top: "5vw",
      left: "5vw",
      right: "5vw",
      bottom: "5vw",
      height: "10vw",
      width: "10vw",
    };
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div class="text-center errorMessage">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div>
          <div className="loadingContainer">
            <img
              className="plate"
              src="../images/loadingIcon.png"
              alt="background"
            />
            <Animated.Image
              style={carrotStyle}
              source="../images/ingredientIcon3.png"
              alt="carrot"
            />
          </div>
          <h1 className="text-center loadingText">Awaiting Yumminess</h1>
        </div>
      );
    } else {
      const group = items.data.recipes.reduce((r, e) => {
        const key1 = e.mealName[0];
        if (key1 !== undefined) {
          var key = key1.toUpperCase();
          if (!r[key]) r[key] = [];
          r[key].push(e);
        }
        return r;
      }, {});

      return (
        <HashRouter>
          <div className="contentContainer">
            <div className="spatulaContainer">
              <img
                className="spatula"
                alt="SpatulaImg"
                src="/images/spatulaImage.png"
              />
            </div>
            <div className="recipe-List">
              <div className="browseWidgetContainer">
                <div
                  className="text-center flipList"
                  onClick={this.reverseList}
                >
                  Flip
                </div>
              </div>
              <div>
                <h1> Browse All Recipes </h1>
                {Object.entries(group).map(([key, value], i) => {
                  return (
                    <div className="recipe-Block" key={i}>
                      <div className="recipe-key">
                        <strong>{key}</strong>
                      </div>
                      {value.map((item, j) => (
                        <div className="recipe-Name" key={j}>
                          <NavLink
                            to={`/recipe/${item.idMeal}`}
                            className="links"
                          >
                            {item.mealName}
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </HashRouter>
      );
    }
  }
}

export default Browse;
