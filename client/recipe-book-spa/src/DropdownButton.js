import React, { Component } from "react";
import ReactDOM from 'react-dom';
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

    //   componentDidMount() {
    //     document.addEventListener('click', this.handleClickOutside, true);
    //     }

    //     componentWillUnmount() {
    //         document.removeEventListener('click', this.handleClickOutside, true);
    //     }

      handleClick(event) {
        const id = event.target.id;
        // const id2 = event.target
        var name = document.getElementById(id).innerHTML
        this.props.changeData(name)
        // this.setState({mainText: name});

      }

    //   handleClickOutside = event => {
    //     const domNode = ReactDOM.findDOMNode(this);
    
    //     if (!domNode || !domNode.contains(event.target)) {
    //         console.log("lkjsdflkjs")
    //         this.handleDropdown(event)
    //         event.preventDefault();
    //     }
    // }

      onClick(event) {
        this.handleDropdown(event);
        this.handleClick(event);
        event.preventDefault()
     }

      handleDropdown(event) {
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
        event.preventDefault();
    }

    
  render() {
    let madeArr = Object.entries(this.props.categories)
    let category = madeArr.map(p=>
        <button id = {this.props.className + p[0]} name= {this.props.class + p[0]} className = "text-center dropdownButtons" onClick = {this.onClick} >{p[1]}</button>
    );
    return (

        <div id = {this.props.dropdownContainer} className = "dropdownContainer-closed">
            <button id = {this.props.mainButton} className = "text-center mainButton" onClick = {this.handleDropdown}>{this.props.mainText}
                <img id = {this.props.imageId} className = "downArrow" src = "../images/dropdownIcon.png" alt = "dropdown"/>
                <img className = "uploadImage" alt = "category" src = {this.props.image}/>
            </button>
            <div id = {this.props.dropdown} className = "dropdown-closed">
                {category}
            </div>
        </div>
    );
  }
}
 
export default DropdownButton;