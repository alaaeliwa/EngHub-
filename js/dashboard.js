document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const mainContent = document.querySelector('.main-content');

    // Toggle Sidebar on Mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Handle Search Functionality (Real-time Filtering)
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            const sections = [
                { containerId: 'materialsList', cardClass: '.material-card', emptyId: 'materialsEmpty' },
                { containerId: 'courseGrid', cardClass: '.course-card', emptyId: 'coursesEmpty' },
                { containerId: 'workshopsList', cardClass: '.workshop-card', emptyId: 'workshopsEmpty' }
            ];

            sections.forEach(section => {
                const container = document.getElementById(section.containerId);
                if (!container) return;

                const cards = container.querySelectorAll(section.cardClass);
                const emptyState = document.getElementById(section.emptyId);
                let hasResults = false;

                cards.forEach(card => {
                    const title = card.querySelector('h4').textContent.toLowerCase();
                    const info = card.textContent.toLowerCase(); // Search everything in the card
                    
                    if (title.includes(query) || info.includes(query)) {
                        card.style.display = 'flex';
                        if (section.cardClass === '.course-card') card.style.display = 'block'; // Maintain block for courses
                        hasResults = true;
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Handle Empty State visibility
                if (emptyState) {
                    if (hasResults) {
                        emptyState.classList.add('hidden');
                    } else {
                        emptyState.classList.remove('hidden');
                    }
                }
            });
        });
    }

    // Handle Category selection
    const categories = document.querySelectorAll('.cat-item');
    categories.forEach(cat => {
        cat.addEventListener('click', (e) => {
            e.preventDefault();
            categories.forEach(c => c.classList.remove('active'));
            cat.classList.add('active');
            
            // In a real app, this would filter the content
            console.log(`Filter by: ${cat.textContent}`);
        });
    });

    // Simple animation trigger for material cards
    const materialCards = document.querySelectorAll('.material-card');
    materialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Simulate Loading State for all sections
    const simulateLoading = () => {
        const sections = [
            { id: 'materialsList', skeletons: '.material-skeleton', content: '.list-content' },
            { id: 'courseGrid', skeletons: '.course-skeleton', content: '.grid-content' },
            { id: 'workshopsList', skeletons: '.workshop-skeleton', content: '.list-content' }
        ];

        sections.forEach(section => {
            const container = document.getElementById(section.id);
            if (!container) return;

            const skeletons = container.querySelectorAll(section.skeletons);
            const content = container.querySelector(section.content);
            const emptyState = container.querySelector('.empty-state');

            // Show skeletons, hide content/empty
            skeletons.forEach(s => s.classList.remove('hidden'));
            if (content) content.classList.add('hidden');
            if (emptyState) emptyState.classList.add('hidden');

            // After 1.5s, hide skeletons and show content
            setTimeout(() => {
                skeletons.forEach(s => s.classList.add('hidden'));
                
                // For demo purposes: show content if it exists, otherwise show empty state
                // Here we always show content if it exists in the dummy data
                if (content) {
                    content.classList.remove('hidden');
                } else if (emptyState) {
                    emptyState.classList.remove('hidden');
                }
            }, 1500 + Math.random() * 1000);
        });
    };

    simulateLoading();
});
