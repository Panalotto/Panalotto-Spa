<<<<<<< HEAD
import '../styles/navBar.css';
import Layout from '../layouts/default.js';
import Navigation from '../components/nav.js';
import Header from '../components/header.js';

=======
import mainpageComponent from "../components/mainpage.js"; // ✅ Rename import
import Layout from "../layouts/default.js";
>>>>>>> f536cab82f57622f7d8c56832aa5688989c1fce4

export default function mainpage() {
    const { main } = Layout(this.root);
    mainpageComponent(main); 
}
