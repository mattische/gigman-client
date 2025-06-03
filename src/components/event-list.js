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
        this.crew = result[0].crew || "No Crew";
        const futureEvents = getFutureDatesFromArray(result);
        this.events = futureEvents;
        this.render();
    }

    render() {
        const list = this.events.map((event) => {
            // possibly special characters and html characters
            const encodeData = btoa(JSON.stringify(event));
            
            return `<div class="single-event moveFromRight">
                        <single-event event='${encodeData}'></single-event>
                    </div>`;
        }).join("");

        // set the header to the crews name
        document.querySelector('header').innerHTML = `<strong>${this.crew}</strong>` || 'Crew';
        this.innerHTML = `${list}`;
    }
}