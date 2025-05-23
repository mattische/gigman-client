export default class CrewView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<main class="main">
                                <crew-list></crew-list>
                             </main>
                             `;
    }
}