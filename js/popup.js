document.addEventListener('DOMContentLoaded', () => {
    const CURRENT_VERSION = "v2.8"; // version

    const popupContainer = document.getElementById('popup-container');
    const closeBtn = document.getElementById('close-btn');
    const popupOverlay = document.getElementById('popup-overlay');

    const seenVersion = localStorage.getItem('popupSeenVersion');

    if (seenVersion !== CURRENT_VERSION) {
        popupContainer.classList.remove('popup-hidden');
    }

    function closePopup() {
        popupContainer.classList.add('popup-hidden');
        localStorage.setItem('popupSeenVersion', CURRENT_VERSION);
    }

    closeBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', closePopup);
});