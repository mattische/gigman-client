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
                          <div class="event-right-box" data-event-id="${this.event.id}">
                            <h5>${this.event.event_name}</h5> 
                             ${this.event.venue_name} <br>
                             ${this.event.venue_address}
                          </div>`;
        
        // add event listener for click
        this.querySelector('.event-right-box').addEventListener('click', (evt) => {
            const eventId = evt.currentTarget.getAttribute('data-event-id');
            console.log("Event ID clicked:", eventId);
            location.hash = `#event-details/${eventId}`;
            //this.viewEventDetails(eventId);
        });
    }

    viewEventDetails(eventId) {
        // this function can be used to view event details
        // for example, redirect to a detailed event page
        console.log("details for event:", eventId);
        const eventDetails = document.createElement("event-details");
        eventDetails.setAttribute("event-id", eventId);
        this.innerHTML = "";
        this.appendChild(eventDetails);
    }
}