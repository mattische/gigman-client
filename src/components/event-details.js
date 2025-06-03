import { EventModel } from "../model/event-model.js";

export default class EventDetails extends HTMLElement {
  constructor() {
    super();
    this.eventId = "";
    this.eventName = "";
    this.eventDate = "";
    this.eventAddress = "";
    this.eventVenueName = "";
    this.eventDescription = "";
    this.isEditing = false;

    this.eventModel = new EventModel();
  }

  static get observedAttributes() {
    return ["event-id", "editable"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "event-id" && oldValue !== newValue) {
      this.eventId = newValue;
      this.loadEventDetails(newValue);
    }
    
    if (name === "editable") {
      this.isEditing = newValue !== null && newValue !== "false";
    }
  }

  async loadEventDetails(eventId) {
    if (!eventId) return;
    
    try {
      const data = await this.eventModel.fetchEventDetails(eventId);
      
      this.eventName = data.event_name;
      this.eventDate = data.event_date;
      this.eventAddress = data.venue_address;
      this.eventVenueName = data.venue_name;
      this.eventDescription = data.event_description;
      
      this.render();
      
      // Dispatch event that data is loaded
      this.dispatchEvent(new CustomEvent('event-loaded', { 
        detail: { eventId: this.eventId },
        bubbles: true 
      }));
    } catch (error) {
      this.renderError(error);
      
      // Dispatch event that there was an error
      this.dispatchEvent(new CustomEvent('event-error', { 
        detail: { error },
        bubbles: true 
      }));
    }
  }
  
  render() {
    if (this.isEditing) {
      this.renderForm();
    } else {
      this.renderDetails();
    }
  }
  
  renderDetails() {
    this.innerHTML = `
      <div class="event-info single-event">
        <h3>${this.eventName}</h3>
        <div class="event-metadata">
          <p><strong>Date:</strong> ${this.eventDate}</p>
          <p><strong>Venue:</strong> ${this.eventVenueName}</p>
          <p><strong>Address:</strong> ${this.eventAddress}</p>
        </div>
        ${this.eventDescription ? 
          `<div class="event-description">
            <h4>Description</h4>
            <p>${this.eventDescription}</p>
          </div>` : ''
        }
      </div>
    `;
    
    // Emit event that component rendered details
    this.dispatchEvent(new CustomEvent('details-rendered', { bubbles: true }));
  }

  renderForm() {
    this.innerHTML = `
      <form class="event-form">
        <div class="form-group">
          <label for="eventName">Event Name:</label>
          <input type="text" id="eventName" class="styled-input" value="${this.eventName}">
        </div>
        
        <div class="form-group">
          <label for="eventDate">Date:</label>
          <input type="date" id="eventDate" class="styled-input" value="${this.eventDate}">
        </div>
        
        <div class="form-group">
          <label for="eventVenue">Venue:</label>
          <input type="text" id="eventVenue" class="styled-input" value="${this.eventVenueName}">
        </div>
        
        <div class="form-group">
          <label for="eventAddress">Address:</label>
          <input type="text" id="eventAddress" class="styled-input" value="${this.eventAddress}">
        </div>
        
        <div class="form-group">
          <label for="eventDescription">Description:</label>
          <textarea id="eventDescription" class="styled-input" rows="4">${this.eventDescription}</textarea>
        </div>
        
        <div class="button-group">
          <button type="submit" class="button blue-button">Save</button>
          <button type="button" class="button" id="cancelEdit">Cancel</button>
        </div>
      </form>
    `;
    
    // Add event listeners
    this.querySelector('form').addEventListener('submit', this.handleSubmit.bind(this));
    this.querySelector('#cancelEdit').addEventListener('click', this.handleCancel.bind(this));
    
    // Update field values from input as they change
    this.querySelector('#eventName').addEventListener('input', (e) => this.eventName = e.target.value);
    this.querySelector('#eventDate').addEventListener('input', (e) => this.eventDate = e.target.value);
    this.querySelector('#eventVenue').addEventListener('input', (e) => this.eventVenueName = e.target.value);
    this.querySelector('#eventAddress').addEventListener('input', (e) => this.eventAddress = e.target.value);
    this.querySelector('#eventDescription').addEventListener('input', (e) => this.eventDescription = e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const updatedEvent = {
      event_id: this.eventId,
      event_name: this.eventName,
      event_date: this.eventDate,
      venue_name: this.eventVenueName,
      venue_address: this.eventAddress,
      event_description: this.eventDescription
    };
    
    // Dispatch event with updated data
    this.dispatchEvent(new CustomEvent('event-updated', {
      detail: { event: updatedEvent },
      bubbles: true
    }));
    
    // Switch to display mode
    this.isEditing = false;
    this.render();
  }
  
  handleCancel() {
    this.isEditing = false;
    this.render();
    
    // Dispatch cancel event
    this.dispatchEvent(new CustomEvent('edit-cancelled', { bubbles: true }));
  }
  
  renderError(error) {
    this.innerHTML = `
      <div class="error-message">
        <p>Error loading event: ${error.message || 'Could not load event details'}</p>
      </div>
    `;
  }
}
