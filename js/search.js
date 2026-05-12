document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('globalSearchInput');
    const resultsGrid = id => document.getElementById(id);
    const resultCards = document.querySelectorAll('.result-card');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.querySelector('.results-count');

    // unified search and filter function
    const performSearch = () => {
        const query = searchInput.value.toLowerCase();
        let visibleCount = 0;

        resultCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            const type = card.classList.contains('workshop') ? 'workshops' : 
                         card.classList.contains('course') ? 'courses' : 'study materials';

            // Check if matches query
            const matchesQuery = title.includes(query) || desc.includes(query);
            
            // For this demo, we'll just filter by text. 
            // Real logic would check checkbox states too.
            
            if (matchesQuery) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update count text
        resultsCount.textContent = `Showing ${visibleCount} results for "${searchInput.value || 'everything'}"`;

        // Toggle Empty State
        if (visibleCount === 0) {
            noResults.style.display = 'flex';
            document.getElementById('searchResultsGrid').style.display = 'none';
        } else {
            noResults.style.display = 'none';
            document.getElementById('searchResultsGrid').style.display = 'flex';
        }
    };

    // Event Listeners
    searchInput.addEventListener('input', performSearch);

    // Filter Checkboxes logic (Simple simulation)
    const checkboxes = document.querySelectorAll('.checkbox-group input');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', performSearch);
    });

    // Sort Dropdown simulation
    const sortSelect = document.querySelector('.sort-dropdown select');
    sortSelect.addEventListener('change', () => {
        const grid = document.getElementById('searchResultsGrid');
        const cards = Array.from(grid.children);
        
        // Simple visual shuffle for demo
        cards.reverse().forEach(card => grid.appendChild(card));
        
        // animation trigger
        grid.classList.remove('animate-in');
        void grid.offsetWidth; // trigger reflow
        grid.classList.add('animate-in');
    });
});
