import { getDateAsDay, getDateAsMonth, getDateAsDayNumber } from '../helpers/date-formatter.js';

export default class SingleEvent extends HTMLElement {
    // component attributes
    static get observedAttributes() {
        return ['event'];
    }

    get event() {
        // decode the data from base64
        // and parse it to json
        return JSON.parse(atob(this.getAttribute("event")));
    }

    // connect component
    connectedCallback() {
        const eventDay = getDateAsDay(this.event.event_date);
        const eventMonth = getDateAsMonth(this.event.event_date);
        const eventDayNumber = getDateAsDayNumber(this.event.event_date);

        this.innerHTML = `<div class="event-left-box">
                            ${eventDay}
                            <h4>${eventDayNumber}</h4>
                            ${eventMonth}
                          </div>
                          <div class="event-right-box">
                            <h5>${this.event.event_name}</h5> 
                             ${this.event.venue_name}
                             ${this.event.event_date}
                          </div>`;
    }
}