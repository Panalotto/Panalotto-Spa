// import '../styles/navBar.css';
import Layout from '../layouts/default.js';

export default function PageNotFound(){
    const { main } = Layout(this.root);

    main.innerHTML = `<h1> 406 Not Found </h1>`
}