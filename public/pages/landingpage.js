import LandingPageComponent from "../components/landingpage.js";  // ✅ Use different name
import Layout from "../layouts/default.js";

export default function LandingPage() {  
    const { main } = Layout(document.getElementById('app'));  
    LandingPageComponent(main);  
}
