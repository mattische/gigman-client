import { EventModel } from '../model/event-model.js';
import { getDateAsDay, getDateAsDayNumber, getDateAsMonth, getTFDAS } from '../helpers/date-formatter.js';

export default class EventDetailsView extends HTMLElement {
    constructor() {
        super();
        this.eventId = "";
        this.eventName = "";
        this.eventDate = "";
        this.eventAddress = "";
        this.eventVenueName = "";
        this.eventDescription = "";

        this.getInTime = "";
        this.scTime = "";
        this.doorsTime = "";
        this.showStartTime = "";
        this.hotelCheckinTime = "";
        this.hotelCheckoutTime = "";

        this.isEditing = false; // Track if we are in edit mode


        // Assuming EventModel is imported or defined elsewhere
        this.eventModel = new EventModel();
    }
    
    static get observedAttributes() {
        return ["event-id"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "event-id" && oldValue !== newValue) {
            this.eventId = newValue;
            this.loadEventDetails(newValue);
        }
    }
        
    connectedCallback() {
        // Apply slide-in animation from your CSS
        this.classList.add('slide-in');
        
        // Check if we have an event-id attribute, if not try URL param
        if (!this.eventId) {
            const urlParams = new URLSearchParams(window.location.search);
            const paramId = urlParams.get('id');
            
            if (paramId) {
                this.eventId = paramId;
                this.loadEventDetails(paramId);
            } else {
                this.renderEmptyState();
            }
        }
    }
    
    
    async loadEventDetails(eventId) {
        // Show loading state
        this.innerHTML = `
            <main class="main">
                <div class="loader"></div>
            </main>
        `;
        
        try {
            const data = await this.eventModel.fetchEventDetails(eventId);
            
            this.eventName = data.event_name;
            this.eventDate = data.event_date;
            this.eventAddress = data.venue_address;
            this.eventVenueName = data.venue_name;
            this.eventDescription = data.event_description;

            this.getInTime = getTFDAS(data.get_in || "");
            this.scTime = getTFDAS(data.soundcheck_time || "");
            this.doorsTime = getTFDAS(data.doors || "");
            this.showStartTime = getTFDAS(data.show_start_time || "");
            //this.hotelCheckinTime = data.accomodation_check-in || "";

            //this.hotelCheckoutTime = data.accomodation_check-out || "";
            
            this.renderEventDetails();
        } catch (error) {
            this.renderError(error);
        }
    }
    
    renderEventDetails() {
        const day = getDateAsDay(this.eventDate);
        const dayNumber = getDateAsDayNumber(this.eventDate);
        const month = getDateAsMonth(this.eventDate);
        this.eventDateFriendly = `${day}, ${dayNumber} ${month}`;
        this.eventAddress = this.eventAddress || 'No address provided';
        this.eventVenueName = this.eventVenueName || 'No venue name provided';
        
        document.querySelector('header').innerHTML = `<strong>${this.eventName.toLocaleUpperCase()}</strong>${this.eventDate}` || 'Event Details';

        this.innerHTML = `
            <main class="main">
                <div class="event-details-container">
                    <h4>${this.eventName.toUpperCase()}</h4>
                    
                    <div class="event-info">
                        <p><strong>${this.eventDateFriendly}</strong></p>
                        <p><strong>${this.eventVenueName}</strong></p>
                        <p><strong>${this.eventAddress}</strong></p>
                    </div>
                    <hr>
                    
                    ${this.eventDescription ? 
                      `<div class="event-description">
                          <h5>INFO</h5>
                          <p>${this.eventDescription}</p>
                      </div>` : ''
                    }
                    <hr>
                    <div class="event-times">
                        <h5>Schedule</h5>
                        <ul>
                            ${this.getInTime ? `<li>${this.getInTime} - GET-IN</li>` : ''}
                            ${this.scTime ? `<li>${this.scTime} - SOUNDCHECK</li>` : ''}
                            ${this.doorsTime ? `<li>${this.doorsTime} - DOORS</li>` : ''}
                            ${this.showStartTime ? `<li>${this.showStartTime} - SHOW</li>` : ''}
                            ${this.hotelCheckinTime ? `${this.hotelCheckinTime} - Hotel Check-in</li>` : ''}
                            
                        </ul>
                    </div>
                    <hr>
                    <div class="button-container">
                        <button id="edit-event" class="button blue-button">Edit Event</button>
                        <button id="back-button" class="button">Back to Events</button>
                    </div>
                </div>
            </main>
        `;
        
        // Add event listeners
        this.querySelector('#edit-event').addEventListener('click', () => {
            //window.location.href = `edit-event.html?id=${this.eventId}`;
            // Or trigger your edit mode/form
            this.dispatchEvent(new CustomEvent('edit-event', { detail: { eventId: this.eventId } }));
            this.classList.remove('slide-in'); // Remove animation class
            this.classList.add('slide-out'); // Add slide-out animation
            setTimeout(() => {
                this.remove(); // Remove element after animation
            }, 300); // Match duration of slide-out animation


        });
        
        this.querySelector('#back-button').addEventListener('click', () => {
            window.history.back();
        });
    }
    
    renderEmptyState() {
        this.innerHTML = `
            <main class="main">
                <div class="event-empty-state">
                    <h2>No event selected</h2>
                    <p>Please select an event from the list</p>
                    <button id="back-button" class="button">Back to Events</button>
                </div>
            </main>
        `;
        
        this.querySelector('#back-button').addEventListener('click', () => {
            window.history.back();
        });
    }
    
    renderError(error) {
        this.innerHTML = `
            <main class="main">
                <div class="error-container">
                    <h2>Error loading event</h2>
                    <p>${error.message || 'Could not load event details'}</p>
                    <button id="back-button" class="button">Back to Events</button>
                </div>
            </main>
        `;
        
        this.querySelector('#back-button').addEventListener('click', () => {
            window.history.back();
        });
    }
}

