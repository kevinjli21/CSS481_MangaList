/**
 * main.js - Home Page Contoller
 * 
 * Manages the UI components and connects the HTML layout to the MangaService API layer.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Wait for HTML to fully load before trying to manipulate it
    initDashboard();
});

async function initDashboard() {
    // Load the Hero Banner with a featured title
    // Will probably change to be dynamic
    await loadHeroBanner("Sono Bosque Doll wa Koi");

    // Load scrollable rows
    const rowContainers = document.querySelectorAll('.row-container');

    if (rowContainers.length >= 2) {
        // rowContainers[0] = Popular Action
        await populateRow(rowContainers[0], "Action", 10);
        
        // rowContainers[1] = New Releases
        await populateRow(rowContainers[1], "Romance", 10);
    }
}

async function loadHeroBanner(titleQuery) {
    const results = await MangaService.searchManga(titleQuery, 5)

    if (results.length > 0) {
        const manga = results.find(m => m.author.includes('Fukuda') || m.author.includes('Shinichi')) || results[0];
        const banner = document.querySelector('.hero-banner');
        const titleElem = document.querySelector('.hero-title');
        const synopsisElem = document.querySelector('.hero-synopsis');

        banner.style.backgroundImage = `url('${manga.coverImage}')`;
        titleElem.textContent = manga.title;

        // Truncate long descriptions
        const shortDesc = manga.description.length > 150
            ? manga.description.substring(0, 150) + '...'
            : manga.description;
        synopsisElem.textContent = shortDesc;
    } else {
        console.error("No manga found for the hero banner.");
    }
}

async function populateRow(containerElem, query, limit) {
    // Fetch data from API service
    const mangaList = await MangaService.searchManga(query, limit);

    // Clear out gray HTML placeholder cards
    containerElem.innerHTML = '';

    // Generate new dynamic cards
    mangaList.forEach(manga => {
        const card = document.createElement('div');
        card.className = 'manga-card';

        // Set cover image directly as the background
        card.style.backgroundImage = `url('${manga.coverImage}')`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        card.title = manga.title;

        // Add click listener for More Info / Reading phase
        card.addEventListener('click', () => {
            console.log(`Clicked on ${manga.title} (ID: ${manga.id})`);
            // TODO: Trigger the detailed info popup here
        });
        containerElem.appendChild(card);
    });
}