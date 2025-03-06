import '../styles/navBar.css';
<<<<<<< HEAD:src/pages/mainPage.js
import Layout from '../layouts/default';
import Navigation from '../components/nav';
import Header from '../components/header';

=======
import Layout from '../layouts/default.js';
import Navigation from '../components/nav.js';
import Header from '../components/header.js';
i
>>>>>>> fc7ad2b6436e51716b9b063656450f0991884cd6:public/pages/mainPage.js

export default function MainPage() {
    const { header, navigation } = Layout(this.root);
    Header(header);
    Navigation(navigation);

}