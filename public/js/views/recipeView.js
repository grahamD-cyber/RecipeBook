import abstractView from "./abstractView.js";

export default class extends abstractView {
    constructor() {
        super();
        this.setTitle("Recipe View");
    }
    async getHtml() {
        return `
            <h1>Recipe View</h1>
        `;
    }
}