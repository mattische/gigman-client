export default class EventsView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<main class="main">
                                <event-list></event-list>
                             </main>
                             `;
    }
}