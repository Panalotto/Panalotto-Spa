// import '../styles/navBar.css';

export default function Navigation(root) {
    root.innerHTML = `

    `;

    const sideNavBarLinks = document.querySelectorAll('.sidebar a');
    const navText = document.getElementById('nav-text');

    function updateActiveState(link) {
        sideNavBarLinks.forEach(nav => nav.classList.remove('active')); // Remove active class from all links
        link.classList.add('active'); // Add active class to the clicked link
        navText.textContent = link.dataset.title || ''; // Update nav-text with the data-title of the active link
    }

    // Event listener setup for each link
    document.getElementById('search').addEventListener('click', () => {
        if (localStorage.getItem('token')) {
            history.pushState({}, '', '/search');
            window.dispatchEvent(new Event('popstate'));
            updateActiveState(document.getElementById('search'));
        } else {
            history.pushState({}, '', '/welcome');
            window.dispatchEvent(new Event('popstate'));
        }
    });

    document.getElementById('post').addEventListener('click', () => {
        if (localStorage.getItem('token')) {
            addPostListener();
        } else {
            history.pushState({}, '', '/welcome');
            window.dispatchEvent(new Event('popstate'));
        }
    });

    document.getElementById('activity').addEventListener('click', () => {
        if (localStorage.getItem('token')) {
            history.pushState({}, '', '/activity');
            window.dispatchEvent(new Event('popstate'));
            updateActiveState(document.getElementById('activity'));
        } else {
            history.pushState({}, '', '/welcome');
            window.dispatchEvent(new Event('popstate'));
        }
    });

    document.getElementById('profile').addEventListener('click', () => {
        if (localStorage.getItem('token')) {
            history.pushState({}, '', '/profile');
            window.dispatchEvent(new Event('popstate'));
            updateActiveState(document.getElementById('profile'));
        } else {
            history.pushState({}, '', '/welcome');
            window.dispatchEvent(new Event('popstate'));
        }
    });

    // Event listener for the logout icon
    const logout = document.getElementById('logout-icon');
    if (localStorage.getItem('token')) {
        logout.style.display = 'block';
    }

    logout.addEventListener('click', () => {
        localStorage.removeItem('token');
        history.pushState({}, '', '/welcome');
        window.dispatchEvent(new Event('popstate'));
    });

    // Helper function to set the active state when a link is clicked
    sideNavBarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            if (link.getAttribute('href')) {
                event.preventDefault();
                history.pushState({}, '', link.getAttribute('href'));
                window.dispatchEvent(new Event('popstate'));
            }
            updateActiveState(link);
        });
    });

    // Check if the current page URL matches the link's href and set the active state
    sideNavBarLinks.forEach(link => {
        // Check if the href matches the pathname
        if (window.location.pathname === link.getAttribute('href') || (window.location.pathname === '/' && link.id === 'home')) {
            updateActiveState(link);
        }
    });
}

function addPostListener() {
    const postButton = document.getElementById('post-button');
    const popupOverlay = document.getElementById('popupOverlay');
    postButton.addEventListener('click', () => {
        popupOverlay.style.display = 'flex';
    });
}