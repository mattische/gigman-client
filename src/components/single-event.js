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
        this.innerHTML = `<div class="event-left-box">
                            ${this.event.id} 
                            ${this.event.event_date}
                          </div>
                          <div class="event-right-box">
                            ${this.event.event_name} 
                             Venue: ${this.event.venue_name}
                          </div>`;
    }
}