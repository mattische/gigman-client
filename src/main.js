import Router from "./router.js";
import Navigation from "./navigation.js";

// import components
import EventList from "./components/event-list.js";
import SingleEvent from "./components/single-event.js";

// import views
import NotFound from "./components/not-found.js";
import EventsView from "./views/events.js";


customElements.define('router-outlet', Router);
customElements.define('navigation-outlet', Navigation);

//define components
customElements.define('event-list', EventList);
customElements.define('single-event', SingleEvent);
customElements.define('not-found', NotFound);

// define views
customElements.define('events-view', EventsView);
