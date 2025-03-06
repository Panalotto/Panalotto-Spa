import SPA from "./core/spa";


import './styles/common.css';
import PageNotFound from "./pages/pageNotFound";
import SignIn from "./pages/login";

const app = new SPA({
    root: document.getElementById('app'),
    defaultRoute: PageNotFound,
})

app.add('/', SignIn)


app.handleRouteChanges();