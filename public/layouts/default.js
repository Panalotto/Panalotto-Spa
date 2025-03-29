export default function Layout(root){
    root.innerHTML = `
    <header id="header"></header>
    <div id="container">
      <main id="main"></main>
    </div>
    `
    
    return{
        header: document.getElementById('header'),
        main: document.getElementById('main'),
    }
}