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

        //sort the events by date
        this.events = result.data.sort((a, b) => {
            return new Date(a.event_date) - new Date(b.event_date);
        });
        
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

        this.innerHTML = `${list}`;
    }
}