export default class NotFound extends HTMLElement {

    // connect component
    connectedCallback() {
        this.innerHTML = "Route not found";
    }
}
