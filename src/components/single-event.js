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
        this.innerHTML = `<h4>${this.event.event_date}</h4><p>Venue: ${this.event.venue_name}</p><p>Address: ${this.event.venue_address.lat}</p>`;
    }
}