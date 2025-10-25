document.addEventListener('DOMContentLoaded', function() {
    const albumsView = document.getElementById('albums-view');
    const albumView = document.getElementById('album-view');
    const albumsContainer = document.getElementById('albums-container');
    const photosContainer = document.getElementById('photos-container');
    const albumTitle = document.getElementById('album-title');
    const albumDescription = document.getElementById('album-description');
    const backToAlbumsBtn = document.getElementById('back-to-albums');
    
    let albumsData = [];
    
    function loadAlbums() {
        fetch('photos.json')
            .then(response => response.json())
            .then(data => {
                albumsData = data.albums;
                displayAlbums(albumsData);
            })
            .catch(error => {
                console.error('Error loading albums:', error);
                albumsContainer.innerHTML = '<div class="no-albums"><p>Chyba při načítání fotoalb. Prosím zkuste to později.</p></div>';
            });
    }
    
    function displayAlbums(albums) {
        if (albums.length === 0) {
            albumsContainer.innerHTML = '<div class="no-albums"><p>Žádná fotoalba nejsou k dispozici.</p></div>';
            return;
        }
        
        let albumsHTML = '';
        albums.forEach(album => {
            const photoCount = album.photos ? album.photos.length : 0;
            albumsHTML += `
                <div class="album-card" data-album-id="${album.id}">
                    <img src="${album.coverImage}" alt="${album.title}" class="album-cover" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKAnlBob3RvIG5vdCBhdmFpbGFibGXigJ48L3RleHQ+PC9zdmc+'">
                    <div class="album-info">
                        <h3>${album.title}</h3>
                        <p>${album.description}</p>
                        <div class="photo-count">${photoCount} fotografií</div>
                    </div>
                </div>
            `;
        });
        
        albumsContainer.innerHTML = albumsHTML;
        
        document.querySelectorAll('.album-card').forEach(card => {
            card.addEventListener('click', function() {
                const albumId = this.getAttribute('data-album-id');
                showAlbum(albumId);
            });
        });
    }
    
    function showAlbum(albumId) {
        const album = albumsData.find(a => a.id === albumId);
        if (!album) return;
        
        albumTitle.textContent = album.title;
        albumDescription.textContent = album.description;
        
        displayPhotos(album.photos);
        
        albumsView.style.display = 'none';
        albumView.style.display = 'block';
    }
    
    function displayPhotos(photos) {
        if (!photos || photos.length === 0) {
            photosContainer.innerHTML = '<p>Žádné fotografie v tomto albu.</p>';
            return;
        }
        
        let photosHTML = '';
        photos.forEach(photo => {
            photosHTML += `
                <div class="photo-item">
                    <img src="${photo.thumb || photo.src}" alt="Fotografie" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKAnlBob3RvIG5vdCBhdmFpbGFibGXigJ48L3RleHQ+PC9zdmc+'">
                </div>
            `;
        });
        
        photosContainer.innerHTML = photosHTML;
    }
    
    backToAlbumsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        albumView.style.display = 'none';
        albumsView.style.display = 'block';
    });
    
    loadAlbums();
});