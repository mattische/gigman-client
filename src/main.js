import Router from "./router.js";
import Navigation from "./navigation.js";

// import components
import EventList from "./components/event-list.js";
import SingleEvent from "./components/single-event.js";
import CrewList from "./components/crew-list.js";
import EventDetails from "./components/event-details.js";

// import views
import NotFound from "./components/not-found.js";
import EventsView from "./views/events.js";
import CrewView from "./views/crew.js";
import EventDetailsView from "./views/event-details-view.js";

customElements.define('router-outlet', Router);
customElements.define('navigation-outlet', Navigation);

// Components that don't define themselves
if (!customElements.get('event-list')) {
  customElements.define('event-list', EventList);
}
if (!customElements.get('single-event')) {
  customElements.define('single-event', SingleEvent);
}
customElements.define('not-found', NotFound);
customElements.define('crew-list', CrewList);
customElements.define('event-details', EventDetails);

// define views
customElements.define('events-view', EventsView);
customElements.define('crew-view', CrewView);
customElements.define('event-details-view', EventDetailsView);