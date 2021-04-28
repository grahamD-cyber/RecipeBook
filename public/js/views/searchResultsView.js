import abstractView from "./abstractView.js";

export default class extends abstractView {
    constructor() {
        super();
        this.setTitle("Search Results");
    }
    async getHtml() {
        return `
            <h1>Search Results</h1>
        `;
    }
}