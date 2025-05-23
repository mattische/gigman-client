import { baseURL } from '../utils.js';

export class CrewModel {
  constructor() {
    this.crew = [];
    
  }

  async fetchCrew() {
    const response = await fetch(`${baseURL}/collections/crews`);
    const result = await response.json();
    console.log("Crew data:", result.data);
    this.crew = result.data;
    return this.crew;
  }

}
