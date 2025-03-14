import '../styles/navBar.css';
import Layout from '../layouts/default.js';
import Navigation from '../components/nav.js';
import Header from '../components/header.js';


export default function mainpage() {
    const { main } = Layout(this.root);
    mainpageComponent(main); // ✅ Correct reference
}
