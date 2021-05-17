
import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import Browse from "./Browse";
import AddRecipe from "./AddRecipe"
import SearchRecipe from "./SearchRecipe"
import RecipePage from "./RecipePage"
 
class Main extends Component {
  render() {
    return (
        <HashRouter>
        <nav className = "nav">
            <div className="background"></div>
            <NavLink exact to="/"><img className = "logo" src = "/images/logo.png" alt="logoImg"/></NavLink>
            <div className = "linkContainer">
                <ul className="header">
                    <li className = "browseButton"><NavLink to= "/browse">Browse Recipes</NavLink></li>
                    <li className = "homeButton"><NavLink exact to= "/">Home</NavLink></li>
                </ul>
            </div>
            <div className="burger">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
        <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/browse" component={Browse}/>
            <Route path="/add" component={AddRecipe}/>
            <Route path="/search" component={SearchRecipe}/>
            <Route path="/recipe/:recipeId" component={RecipePage}/>
        </div>
        </HashRouter>
    );
    }
}

export default Main;