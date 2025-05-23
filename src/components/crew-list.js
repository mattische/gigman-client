//import { baseURL } from "../utils.js";
import { CrewModel } from "../model/crew-model.js";

export default class CrewList extends HTMLElement {
    constructor() {
        super();
        this.crew = [];
    }

    // connect component
    async connectedCallback() {
        this.crewModel = new CrewModel();
        const result = await this.crewModel.fetchCrew();
        
        this.crew = result;
        
        this.render();
    }

    render() {
        const list = this.crew.map((crw) => {
            return `<div class="single-crew">
                        <h4>${crw.crew_name}</h4>
                        <p><a href='${crw.crew_website}'>${crw.crew_website}</a></p>
                        
                        <p>${crw.crew_bio}</p>
                        <p>${crw.crew_email}</p>
                        <p>${crw.crew_phone}</p>
                    </div>    
                    `;
        }).join("");

        this.innerHTML = `${list}`;
    }
}