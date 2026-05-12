document.addEventListener('DOMContentLoaded', () => {
    const courseSearch = document.getElementById('courseSearch');
    const filterYear = document.getElementById('filterYear');
    const filterSemester = document.getElementById('filterSemester');
    const filterType = document.getElementById('filterType');
    
    const yearSections = document.querySelectorAll('.year-section');
    const emptyState = document.getElementById('coursesEmpty');

    const filterCourses = () => {
        const query = courseSearch.value.toLowerCase().trim();
        const yearVal = filterYear.value;
        const semesterVal = filterSemester.value;
        const typeVal = filterType.value;
        
        let totalVisible = 0;

        yearSections.forEach(section => {
            const sectionYear = section.getAttribute('data-year');
            const cards = section.querySelectorAll('.course-main-card');
            let sectionVisibleCount = 0;

            // Check if year matches
            const yearMatch = !yearVal || sectionYear === yearVal;

            cards.forEach(card => {
                const cardSemester = card.getAttribute('data-semester');
                const cardCode = card.getAttribute('data-code').toLowerCase();
                const cardTitle = card.querySelector('h4').textContent.toLowerCase();
                const cardMeta = card.querySelector('.course-meta').textContent.toLowerCase();

                // Logic checks
                const semesterMatch = !semesterVal || cardSemester === semesterVal;
                const searchMatch = !query || cardTitle.includes(query) || cardCode.includes(query);
                const typeMatch = !typeVal || cardMeta.includes(typeVal);

                if (yearMatch && semesterMatch && searchMatch && typeMatch) {
                    card.style.display = 'flex';
                    sectionVisibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/Hide section based on card visibility
            if (sectionVisibleCount > 0) {
                section.style.display = 'block';
                section.querySelector('.course-count').textContent = `${sectionVisibleCount} Courses`;
            } else {
                section.style.display = 'none';
            }

            totalVisible += sectionVisibleCount;
        });

        // Toggle Empty State
        if (totalVisible === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    };

    // Add Listeners
    courseSearch.addEventListener('input', filterCourses);
    filterYear.addEventListener('change', filterCourses);
    filterSemester.addEventListener('change', filterCourses);
    filterType.addEventListener('change', filterCourses);

    // Initial check
    filterCourses();
});
