//import { baseURL } from "../utils.js";
import { EventModel } from "../model/event-model.js";
import { getFutureDatesFromArray } from "../helpers/date-formatter.js";

export default class EventList extends HTMLElement {
    constructor() {
        super();

        this.events = [];
    }

    // connect component
    async connectedCallback() {
        this.evt = new EventModel();
        const result = await this.evt.fetchAllEvents();
        
        const futureEvents = getFutureDatesFromArray(result);
        this.events = futureEvents;
        this.render();
    }

    render() {
        const list = this.events.map((event) => {
            // possibly special characters and html characters
            const encodeData = btoa(JSON.stringify(event));
            
            return `<div class="single-event">
                        <single-event event='${encodeData}'></single-event>
                    </div>`;
        }).join("");

        this.innerHTML = `${list}`;
    }
}