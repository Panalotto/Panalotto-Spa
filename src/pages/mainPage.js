import '../styles/navBar.css';
import Layout from '../layouts/default';
import Navigation from '../components/nav';
import Header from '../components/header';
i

export default function MainPage() {
    const { header, navigation } = Layout(this.root);
    Header(header);
    Navigation(navigation);

}