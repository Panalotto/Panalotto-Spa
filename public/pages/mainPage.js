import mainpageComponent from "../components/mainpage.js"; 
import Layout from "../layouts/default.js";

export default function mainpage() {
    const { main } = Layout(this.root);
    mainpageComponent(main); 
}
