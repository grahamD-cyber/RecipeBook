import React, { Component } from "react";
import "./css/addStyles.css"; 

class DropdownButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            mainText: this.props.categoryText,
            categories: this.props.categories,
            dropdown: this.props.dropdown,
            dropdownContainer: this.props.dropdownContainer,
            imageId: this.props.imageId
        }
      }
      
      handleClick(event) {
        const id = event.target.id;
        var name = document.getElementById(id).innerHTML
        this.setState({mainText: name});
      }

      onClick(event) {
        this.handleDropdown();
        this.handleClick(event);
     }

      handleDropdown() {
          console.log(this.state.dropdown)
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
    // const dropdownContainerId = this.props.dropdownContainer
    // const dropdownId = this.props.dropdown
    // const imageId = this.props.imageId
    let madeArr = Object.entries(this.props.categories)
    let category = madeArr.map(p=>
        <button id = {this.props.class + p[0]} class = "text-center dropdownButtons" onClick = {this.onClick} >{p[1]}</button>
    );

    // function handleDropdown() {
    //     const id = document.getElementById(dropdownContainerId);
    //     const id2 = document.getElementById(dropdownId);
    //     const id3 = document.getElementById(imageId);
    //     if (id.classList.value === "dropdownContainer-closed")
    //     {
    //         id.classList.remove("dropdownContainer-closed");
    //         id.classList.add("dropdownContainer-open");
    //         id2.classList.remove("dropdown-closed");
    //         id2.classList.add("dropdown-open");
    //         id3.classList.add("downArrowRotate");
    //         id3.classList.add("downArrow");
    //     }
    //     else
    //     {
    //         id.classList.remove("dropdownContainer-open");
    //         id.classList.add("dropdownContainer-closed");
    //         id2.classList.remove("dropdown-open");
    //         id2.classList.add("dropdown-closed");
    //         id3.classList.add("downArrow");
    //         id3.classList.remove("downArrowRotate");
    //     }
  
    // }
    return (

        <div id = {this.props.dropdownContainer} class = "dropdownContainer-closed">
            <button id = {this.props.mainButton} class = "text-center mainButton" onClick = {this.handleDropdown}>{this.state.mainText}
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