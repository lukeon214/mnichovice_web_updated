document.addEventListener('DOMContentLoaded', () => {
    const popupContainer = document.getElementById('popup-container');
    const closeBtn = document.getElementById('close-btn');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupWasShown = localStorage.getItem('popupWasShown');

    if (!popupWasShown) {
        popupContainer.classList.remove('popup-hidden');
    }

    function closePopup() {
        popupContainer.classList.add('popup-hidden');
        localStorage.setItem('popupWasShown', 'true');
    }

    closeBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', closePopup);

});