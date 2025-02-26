import SPA from "./core/spa";

const app = new SPA({
    root: document.getElementById('app'),
    defaultRoute: PageNotFound,
})

app.handleRouteChanges();