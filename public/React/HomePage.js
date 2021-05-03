class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <div class = "contentContainer">
                <div class = "spatulaContainer">
                    <img class = "spatula" src = "../images/spatulaImage.png"/>
                </div>
                <div class="mainContainer">
                    <h1>Find a New Recipe</h1>
                    <div class = "containSearch">
                        <div class = "searchContainer">
                            <input class = "searchBox shadow" type="text" placeholder= "Search For a Recipe..."/>
                            <button class = "searchButton">
                                <img class = "searchIcon" src = "../images/searchIcon.png"/>
                            </button>                        
                        </div>
                    </div>
                    <h1>OR</h1>
                    <div class = "uploadContainer">
                        <a href ="/add" class = "uploadRecipe" data-link> Upload Your Own Recipe.</a>
                    </div>
                </div>
            </div>
            /* <div>
                <form>
                    <input>{this.props.innerText}</input>
                </form>
                <span></span>
                <button class = "searchButton">
                    <img class = "searchIcon" src = "../images/searchIcon.png"/>
                </button>
            </div> */
        )
    }


}
