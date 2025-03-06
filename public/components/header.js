import '../styles/header.css';

export default function Header(root) {
    root.innerHTML = `
        <a href="/"><h1 id="conexus">ConeXus</h1></a>
        <h1 id="nav-text"></h1>
    `;
}