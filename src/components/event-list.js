import { baseURL } from "../utils.js";

export default class EventList extends HTMLElement {
    constructor() {
        super();

        this.events = [];
    }

    // connect component
    async connectedCallback() {
        const response = await fetch(`${baseURL}/collections/events`);
        const result = await response.json();

        this.events = result.data;
        
        this.render();
    }

    render() {
        const list = this.events.map((event) => {
            // might contain special characters and html characters
            // so we need to encode the data in base64
            const encodeData = btoa(JSON.stringify(event));
            return `<div class="single-event">
                        <single-event event='${encodeData}'></single-event>
                    </div>`;
        }).join("");

        this.innerHTML = `<h2>DATES</h2>${list}`;
    }
}