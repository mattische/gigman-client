import { baseURL } from '../utils.js';

export class EventModel {
  constructor() {
    this.events = [];
  }

  sortEventsByDate(data) {
    data.sort((a, b) => {
      return new Date(a.event_date) - new Date(b.event_date);
    });
    return data;
  }

  async fetchAllEvents() {
    const response = await fetch(`${baseURL}/collections/events`);
    const result = await response.json();

    // sort the events by date
    const data = this.sortEventsByDate(result.data);
    //this.events = this.data;
    
    this.events = data;
    return data;
  }

  async fetchFutureEvents() {
    const response = await fetch(`${baseURL}/collections/events`);
    const result = await response.json();
    console.log("Sample date format:", result.data[0].event_date);
    
    const futureEvents = result.data.filter((event) => {
      return new Date(event.event_date) > new Date();
    });
    
    // sort the events by date
    const data = this.sortEventsByDate(futureEvents);
    return data;
  }

  async fetchPastEvents() {
    const response = await fetch(`${baseURL}/collections/events`);
    const result = await response.json();
    // remove future events
    this.data = this.data.filter((event) => {
      return new Date(event.event_date) < new Date();
    });

    return result;
  }
  
  async fetchEventDetails(eventId) {
    const response = await fetch(`${baseURL}/collections/events/${eventId}`);
    const result = await response.json();
    
    return result;
  }
}
