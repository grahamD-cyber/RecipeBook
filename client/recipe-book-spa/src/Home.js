import React, { Component } from "react";
import {
    NavLink,
    HashRouter
} from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.setTerm = this.setTerm.bind(this);
        this.state = {
          searchTerm: ""
        };
      }

    setTerm(event) {
        console.log(event.target.value)
        this.setState({ searchTerm: event.target.value });
        event.preventDefault();
    }
    render(){
        return(
            <HashRouter>
            <div className = "contentContainer">
                <div className = "spatulaContainer">
                    <img className = "spatula" alt="SpatulaImg" src = "/images/spatulaImage.png"/>
                </div>
                <div className="mainContainer">
                    <h1>Find a New Recipe</h1>
                    <div className = "containSearch">
                        <div className = "searchContainer">
                            <input className = "searchBox shadow" type="text" onChange={this.setTerm} placeholder= "Search For a Recipe..."/>
                            <button className = "searchButton">
                                <NavLink class = "navLink" to="/search"><img className = "searchIcon" alt="SearchIcon" src = "/images/searchIcon.png"/></NavLink>
                            </button>                        
                        </div>
                    </div>
                    <h1>OR</h1>
                    <div className = "uploadContainer">
                        <NavLink to="/add" className = "uploadRecipe"> Upload Your Own Recipe.</NavLink>
                    </div>
                </div>
            </div>
            </HashRouter>
        )
    }
}

export default Home;