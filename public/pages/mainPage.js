<<<<<<< HEAD
import '../styles/navBar.css';
import Layout from '../layouts/default.js';
import Navigation from '../components/nav.js';
import Header from '../components/header.js';

=======
import mainpageComponent from "../components/mainpage.js"; // ✅ Rename import
import Layout from "../layouts/default.js";
>>>>>>> 7112d4e4aae1f1371c1130413f1c7cb52d431847

export default function mainpage() {
    const { main } = Layout(this.root);
    mainpageComponent(main); // ✅ Correct reference
}
