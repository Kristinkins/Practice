document.addEventListener('DOMContentLoaded', function() {
    // 1. Обычное модальное окно для одиночных изображений
    const popup = document.createElement('div');
    popup.className = 'pop-up';
    popup.style.display = 'none';
    popup.innerHTML = `
        <span class="close-btn">&times;</span>
        <img src="" alt="" class="popup-img">
    `;
    document.body.appendChild(popup);

    // 2. Модальное окно для галереи (только если есть изображения галереи на странице)
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    if (galleryImages.length > 0) {
        const galleryModal = document.createElement('div');
        galleryModal.className = 'gallery-modal';
        galleryModal.style.display = 'none';
        galleryModal.innerHTML = `
            <span class="gallery-close">&times;</span>
            <span class="gallery-prev">&#10094;</span>
            <span class="gallery-next">&#10095;</span>
            <div class="gallery-modal-content">
                <img class="gallery-modal-img" src="" alt="">
            </div>
            <div class="gallery-counter"></div>
        `;
        document.body.appendChild(galleryModal);

        // Логика для галереи
        let currentGalleryIndex = 0;
        const modalImg = galleryModal.querySelector('.gallery-modal-img');
        const galleryCounter = galleryModal.querySelector('.gallery-counter');

        function updateGalleryModal(index) {
            currentGalleryIndex = index;
            const img = galleryImages[currentGalleryIndex];
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            galleryCounter.textContent = `${currentGalleryIndex + 1}/${galleryImages.length}`;
        }

        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function() {
                updateGalleryModal(index);
                galleryModal.style.display = 'flex';
            });
        });

        galleryModal.querySelector('.gallery-close').addEventListener('click', function() {
            galleryModal.style.display = 'none';
        });

        galleryModal.querySelector('.gallery-prev').addEventListener('click', function() {
            currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
            updateGalleryModal(currentGalleryIndex);
        });

        galleryModal.querySelector('.gallery-next').addEventListener('click', function() {
            currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
            updateGalleryModal(currentGalleryIndex);
        });

        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (galleryModal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
                    updateGalleryModal(currentGalleryIndex);
                } else if (e.key === 'ArrowRight') {
                    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
                    updateGalleryModal(currentGalleryIndex);
                } else if (e.key === 'Escape') {
                    galleryModal.style.display = 'none';
                }
            }
        });
    }

    // Логика для обычных изображений
    const images = document.querySelectorAll('img:not(.gallery-image)'); // Все изображения кроме галереи
    
    images.forEach(img => {
        // Проверяем, не является ли родитель изображения галереей
        if (!img.closest('.gallery-container')) {
            img.addEventListener('click', function() {
                const popupImg = popup.querySelector('.popup-img');
                popupImg.src = this.src;
                popupImg.alt = this.alt;
                popup.style.display = 'flex';
            });
        }
    });

    popup.querySelector('.close-btn').addEventListener('click', function() {
        popup.style.display = 'none';
    });

    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (popup.style.display === 'flex' && e.key === 'Escape') {
            popup.style.display = 'none';
        }
    });
});