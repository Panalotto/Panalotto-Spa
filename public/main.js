import SPA from "./core/spa.js";
import PageNotFound from "./pages/pageNotFound.js";
import SignIn from "./pages/login.js";
import SignUp from "./pages/signup.js";
import mainpageComponent from "./pages/mainPage.js";
import ProfilePage from "./pages/profile.js";
import LandingPage from "./pages/landingpage.js";




const app = new SPA({
    root: document.getElementById('app'),
    defaultRoute: PageNotFound,
});

app.add('/signIn', SignIn);
app.add('/signup', SignUp);
app.add('/mainpage', mainpageComponent);
app.add('/profile', ProfilePage);
app.add('/', LandingPage);

app.handleRouteChanges();
