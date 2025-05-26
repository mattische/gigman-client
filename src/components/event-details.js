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

  async loadEventDetails(eventId) {
    const data = await this.eventModel.fetchEventDetails(eventId);

    
    this.eventName = data.event_name;
    this.eventDate = data.event_date;
    this.eventAddress = data.venue_address;
    this.eventVenueName = data.venue_name;
    this.eventDescription = data.event_description;
    console.log("Event data. eventId: ", this.eventId, ", Name: ", this.eventName);
    this.renderForm();
    
  }

  createInput(type, value = "", classList = [], id = "") {
    let element = document.createElement("input");
    element.setAttribute("type", type);

    if (value) {
      element.setAttribute("value", value);
    }

    if (classList.length) {
      element.classList.add(...classList);
    }

    if (id) {
      element.setAttribute("id", id);
    }

    return element;
  }

  createField(labelText, inputType, inputId, fieldName) {
    let label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", inputId);

    let input = this.createInput(inputType, "", ["styled-input"], inputId);
    input.addEventListener("input", (event) => {
      this[fieldName] = event.target.value;
    });

    return { label, input };
  }

  saveInvoiceToLocalStorage(invoice) {
    let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    invoices.push(invoice);
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }


  renderForm() {
    

    this.innerHTML = "";

    // event name in a h4
    const headerDiv = document.createElement("div");
    headerDiv.className = "header";
    
    const headerTitle = document.createElement("h4");
    headerTitle.textContent = `${this.eventName}`;
    headerDiv.appendChild(headerTitle);
    
    this.appendChild(headerDiv);


    let form = document.createElement("form");

    let { label: eventNameLabel, input: eventNameInput } = this.createField(
      "Event",
      "text",
      "eventNameInput",
      "eventName"
    );

    //let eventNameInput = this.createInput("text", this.eventName, ["styled-input"], "eventNameInput");
    eventNameInput.value = this.eventName;
    console.log("Event name input value:", eventNameInput.value);

    
    let submitButton = this.createInput("submit", "", [
      "button",
      "green-button",
    ]);
    submitButton.value = "Update event";

    form.appendChild(eventNameLabel);
    form.appendChild(eventNameInput);
    
    form.appendChild(submitButton);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const invoice = {
        orderId: this.orderId,
        totalPrice: this.totalPrice,
        creationDate: this.creationDate,
        dueDate: this.dueDate,
      };

     //this.saveInvoiceToLocalStorage(invoice);
      this.innerHTML = `<p class="success">event edited!</p>`;
    });

    this.appendChild(form);
  }
}