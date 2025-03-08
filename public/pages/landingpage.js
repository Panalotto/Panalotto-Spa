import LandingPageComponent from "../components/landingpage.js";  // ✅ Use different name
import Layout from "../layouts/default.js";

export default function LandingPage() {  // ✅ Use PascalCase for pages
    const { main } = Layout(document.getElementById('app'));  // ✅ Fixed `this.root`
    LandingPageComponent(main);  // ✅ Use the correct component function
}
