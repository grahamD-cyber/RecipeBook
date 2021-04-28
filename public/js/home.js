import homeView from "./views/homeView.js";
import addView from "./views/addView.js";
import browseView from "./views/browseView.js";
import recipeView from "./views/recipeView.js";
import searchResultsView from "./views/searchResultsView.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        {path: "/", view: homeView},
        {path: "/add", view: addView},
        {path: "/browse", view: browseView},
        {path: "/recipe", view: recipeView},
        {path: "/results", view: searchResultsView}

    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }
    const view = new match.route.view();
    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
}); 

