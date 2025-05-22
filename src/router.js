export default class Router extends HTMLElement {
    constructor() {
        super();

        this.currentRoute = "";
        this.wildcard = "";

        this.allRoutes = {
            "": {
                view: "<event-list></event-list>",
                name: "DATES",
            },
            "crew": {
                view: "<event-list></event-list>",
                name: "CREW",
            },
        };
    }

    get routes() {
        return this.allRoutes;
    }

    // connect component
    connectedCallback() {
        window.addEventListener('hashchange', () => {
            this.resolveRoute();
        });

        this.resolveRoute();
    }

    resolveRoute() {
        let cleanHash = location.hash.replace("#", "");
        let splitHash = cleanHash.split("/");
        

        if (cleanHash.includes("/")) {
            this.currentRoute = splitHash[0];

            this.wildcard = splitHash[1];
        } else {
            this.currentRoute = splitHash;
        }

        this.render();
    }

    render() {
        let html = "<not-found></not-found>";

        if (this.routes[this.currentRoute]) {
            html = this.routes[this.currentRoute].view;
            
            if (this.wildcard) {
                html = html.replace("$wildcard", this.wildcard);
            }
        }


        this.innerHTML = html;
    }
}