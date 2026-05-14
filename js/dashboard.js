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

    // ── Notifications ──
    const btn = document.getElementById('notificationBtn');
    const dropdown = document.getElementById('notificationDropdown');
    if (btn && dropdown) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
      });
      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && e.target !== btn) {
          dropdown.classList.remove('active');
        }
      });
      // Prevent closing when clicking inside the dropdown
      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

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

    // ── Page Transitions ──
    document.body.classList.add('page-fade-in');
    
    // Create transition overlay if it doesn't exist
    let overlay = document.querySelector('.page-transition-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);
    }

    // Handle all internal links for transitions
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !link.target) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                overlay.classList.add('active');
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            });
        }
    });

    // ── Skeleton Loading Simulation ──
    const initSkeletons = () => {
        // Target all grids/lists that should have skeletons
        const containers = document.querySelectorAll('.course-grid, #materialsList, #workshopsList, .results-grid, .stats-grid, .admin-table, .course-main-card');
        
        containers.forEach(container => {
            if (container.children.length === 0) return;

            // Save original styles and hide real children
            const originalChildren = Array.from(container.children);
            originalChildren.forEach(child => {
                if (!child.classList.contains('skeleton-card-placeholder')) {
                    child.setAttribute('data-original-display', child.style.display || 'block');
                    child.style.display = 'none';
                }
            });

            // Create 3 skeleton placeholders if none exist
            if (container.querySelectorAll('.skeleton-card-placeholder').length === 0) {
                for (let i = 0; i < 3; i++) {
                    const skeleton = document.createElement('div');
                    skeleton.className = 'skeleton-card-placeholder';
                    skeleton.style.cssText = 'padding:2rem; background:white; border-radius:20px; margin-bottom:1.5rem; border:1px solid #eee;';
                    
                    skeleton.innerHTML = `
                        <div class="skeleton skeleton-img" style="margin-bottom: 1rem; height:150px;"></div>
                        <div class="skeleton skeleton-title" style="height:20px; width:70%;"></div>
                        <div class="skeleton skeleton-text" style="height:12px; width:90%;"></div>
                        <div class="skeleton skeleton-text" style="height:12px; width:50%;"></div>
                    `;
                    container.appendChild(skeleton);
                }
            }

            // Simulate loading and revealing
            setTimeout(() => {
                // Remove skeletons
                container.querySelectorAll('.skeleton-card-placeholder').forEach(s => s.remove());
                // Show real content using saved display attribute
                originalChildren.forEach(child => {
                    const originalDisplay = child.getAttribute('data-original-display');
                    child.style.display = (originalDisplay === 'none') ? '' : originalDisplay;
                    child.classList.add('animate-in');
                });
            }, 1200 + Math.random() * 600);
        });
    };

    initSkeletons();
});
