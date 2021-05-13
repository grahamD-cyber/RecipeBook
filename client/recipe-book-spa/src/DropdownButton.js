import React, { Component } from "react";
import "./css/addStyles.css"; 

class DropdownButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            categories: this.props.categories,
            dropdown: this.props.dropdown,
            dropdownContainer: this.props.dropdownContainer,
            imageId: this.props.imageId
        }
      }
      
      handleClick(event) {
        const id = event.target.id;
        var name = document.getElementById(id).innerHTML
        this.props.changeData(name)
        // this.setState({mainText: name});

      }

      onClick(event) {
        this.handleDropdown();
        this.handleClick(event);
     }

      handleDropdown() {
        const id = document.getElementById(this.state.dropdownContainer);
        const id2 = document.getElementById(this.state.dropdown);
        const id3 = document.getElementById(this.state.imageId);
        if (id.classList.value === "dropdownContainer-closed")
        {
            id.classList.remove("dropdownContainer-closed");
            id.classList.add("dropdownContainer-open");
            id2.classList.remove("dropdown-closed");
            id2.classList.add("dropdown-open");
            id3.classList.add("downArrowRotate");
            id3.classList.add("downArrow");
        }
        else
        {
            id.classList.remove("dropdownContainer-open");
            id.classList.add("dropdownContainer-closed");
            id2.classList.remove("dropdown-open");
            id2.classList.add("dropdown-closed");
            id3.classList.add("downArrow");
            id3.classList.remove("downArrowRotate");
        }
  
    }

    
  render() {
    let madeArr = Object.entries(this.props.categories)
    let category = madeArr.map(p=>
        <button id = {this.props.class + p[0]} class = "text-center dropdownButtons" onClick = {this.onClick} >{p[1]}</button>
    );
    return (

        <div id = {this.props.dropdownContainer} class = "dropdownContainer-closed">
            <button id = {this.props.mainButton} class = "text-center mainButton" onClick = {this.handleDropdown}>{this.props.mainText}
                <img id = {this.props.imageId} class = "downArrow" src = "../images/dropdownIcon.png" alt = "dropdown"/>
                <img class = "uploadImage" alt = "category" src = {this.props.image}/>
            </button>
            <div id = {this.props.dropdown} class = "dropdown-closed">
                {category}
            </div>
        </div>
    );
  }
}
 
export default DropdownButton;