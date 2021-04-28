import abstractView from "./abstractView.js";

export default class extends abstractView {
    constructor() {
        super();
        this.setTitle("Browse");
    }
    async getHtml() {
        return `
            <h1>Browse Page</h1>
        `;
    }
}