/**
 * reader.js - Theater Mode Controller
 * 
 * Manages the full-screen reading experience.
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Extract Manga ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const mangaId = urlParams.get('mangaId');

    if (!mangaId) {
        window.location.href = 'home_page.html';
        return;
    }

    // Fetch Manga details to populate top HUD title
    const manga = await MangaService.getMangaById(mangaId);
    if (manga) {
        document.getElementById('manga-title-display').textContent = manga.title;
    }

    // TODO: Fetch actual chapter pages with MangaDex API
})