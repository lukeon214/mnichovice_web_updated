// Function to load components
function loadComponent(selector, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
        })
        .catch(error => {
            console.error(`Error loading ${filePath}:`, error);
        });
}

// Load footer when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('#footer-placeholder', 'components/footer.html');
});