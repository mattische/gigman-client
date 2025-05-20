export default class SingleEvent extends HTMLElement {
    // component attributes
    static get observedAttributes() {
        return ['event'];
    }

    get event() {
        return JSON.parse(this.getAttribute("event"));
    }

    // connect component
    connectedCallback() {
        this.innerHTML = `<h4>${this.event.id} ${this.event.event_name}</h4><p>${this.event.event_date} Venue: ${this.event.venue_name}</p><p>Address: ${this.event.venue_address.lat}</p>`;
    }
}