import SPA from "./core/spa.js";


// import './styles/common.css';
import PageNotFound from "./pages/pageNotFound.js";
import SignIn from "./pages/login.js";

const app = new SPA({
    root: document.getElementById('app'),
    defaultRoute: PageNotFound,
})

app.add('/login', SignIn)

app.handleRouteChanges();