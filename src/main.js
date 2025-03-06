import SPA from "./core/spa";

import PageNotFound from "./pages/pageNotFound";
import SignIn from "./pages/login";
import SignUp from "./pages/signup";

const app = new SPA({
    root: document.getElementById('app'),
    defaultRoute: PageNotFound,
})

app.add('/signIn', SignIn)
app.add('/signup', SignUp)


app.handleRouteChanges();