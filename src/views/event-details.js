export default class EventDetailsView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<main class="main">
                                <event-details></event-details>
                             </main>
                             `;
    }
}
