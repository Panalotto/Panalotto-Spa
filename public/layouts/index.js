export function loadMainLayout() {
    const app = document.getElementById('app') || document.body;

    const layoutContainer = document.createElement('div');
    layoutContainer.id = 'main-layout';

    layoutContainer.appendChild(contentsDiv);
    app.appendChild(layoutContainer);
}