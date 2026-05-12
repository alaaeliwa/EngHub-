document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const tabs = document.querySelectorAll('.tab-btn');
    const tabViews = {
        'summaries': 'Summaries',
        'pdfs': 'PDF Documents',
        'videos': 'Video Lectures',
        'exams': 'Exam Bank',
        'external': 'External Resources',
        'comments': 'Discussion'
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            
            // Update active state in UI
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // In a real app, this would load different content
            // For demo, we just update the heading of the view
            const viewHeading = document.querySelector('.tab-header h3');
            if (viewHeading) {
                viewHeading.textContent = `Course ${tabViews[target]}`;
            }

            // Simple animation for content change
            const content = document.getElementById('tabContent');
            content.style.opacity = 0;
            setTimeout(() => {
                content.style.opacity = 1;
            }, 200);
        });
    });

    // Rating / Vote Buttons
    const voteBtns = document.querySelectorAll('.btn-vote');
    voteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from sibling
            btn.parentElement.querySelectorAll('.btn-vote').forEach(b => {
                b.style.backgroundColor = 'white';
                b.style.color = '#777';
            });
            
            // Set active color
            if (btn.classList.contains('like')) {
                btn.style.backgroundColor = '#ecfdf5';
                btn.style.color = '#059669';
            } else {
                btn.style.backgroundColor = '#fef2f2';
                btn.style.color = '#dc2626';
            }
        });
    });
});
