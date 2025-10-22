// Function to load components
function loadComponent(selector, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
            
            // Initialize navbar functionality after loading
            if (filePath.includes('navbar')) {
                initNavbar();
            }
        })
        .catch(error => {
            console.error(`Error loading ${filePath}:`, error);
        });
}

// Initialize navbar functionality
function initNavbar() {
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        
        // Handle dropdowns on mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');
            let isClickHandled = false;
            
            dropdownLink.addEventListener('click', function(e) {
                // Check if we're on mobile (menu is active)
                if (mainNav.classList.contains('active')) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
                // On desktop, let the link work normally
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && mainNav.classList.contains('active')) {
                navToggle.classList.remove('active');
                mainNav.classList.remove('active');
                
                // Close any open dropdowns
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
}

// Load components when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('#navbar-placeholder', 'components/navbar.html');
    loadComponent('#footer-placeholder', 'components/footer.html');
});