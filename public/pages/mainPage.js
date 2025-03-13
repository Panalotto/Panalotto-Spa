<<<<<<< HEAD
import mainpageComponent from "../components/mainpage.js"; 
=======
import mainpageComponent from "../components/mainpage.js"; // ✅ Rename import
>>>>>>> ed7e279b126ee4ea21c5792ec5bbae39b3a4c98f
import Layout from "../layouts/default.js";

export default function mainpage() {
    const { main } = Layout(this.root);
    mainpageComponent(main); 
}
