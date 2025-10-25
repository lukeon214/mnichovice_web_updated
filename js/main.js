function loadComponent(selector, filePath) {
    let fullPath = filePath;
    
    if (window.location.pathname.includes('/') && !window.location.pathname.match(/^\/(index\.html)?$/)) {
        if (filePath.startsWith('components/')) {
            fullPath = '../' + filePath;
        }
    }
    
    fetch(fullPath)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
            
            if (filePath.includes('navbar')) {
                initNavbar();
            }
        })
        .catch(error => {
            console.error(`Error loading ${fullPath}:`, error);
        });
}

function initNavbar() {
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');
            let isClickHandled = false;
            
            dropdownLink.addEventListener('click', function(e) {
                if (mainNav.classList.contains('active')) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
        
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && mainNav.classList.contains('active')) {
                navToggle.classList.remove('active');
                mainNav.classList.remove('active');
                
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadComponent('#navbar-placeholder', 'components/navbar.html');
    loadComponent('#footer-placeholder', 'components/footer.html');
});