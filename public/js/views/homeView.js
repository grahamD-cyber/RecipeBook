import abstractView from "./abstractView.js";

export default class extends abstractView {
    constructor() {
        super();
        this.setTitle("Recipe Book");
    }
    async getHtml() {
        return `
            <h1>Recipe Book</h1>
        `;
    }
}