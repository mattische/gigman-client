//import { baseURL } from "../utils.js";
import { Event } from "../model/event.js";
import { getFutureDatesFromArray } from "../helpers/date-formatter.js";

export default class EventList extends HTMLElement {
    constructor() {
        super();

        this.events = [];
    }

    // connect component
    async connectedCallback() {
        this.evt = new Event();
        const result = await this.evt.fetchAllEvents();
       
       const futureEvents = getFutureDatesFromArray(result);
        this.events = futureEvents;
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