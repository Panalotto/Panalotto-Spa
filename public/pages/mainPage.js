import '../styles/navBar.css';
import Layout from '../layouts/default.js';
import Navigation from '../components/nav.js';
import Header from '../components/header.js';


export default function MainPage() {
    const { header, navigation } = Layout(this.root);
    Header(header);
    Navigation(navigation);

}