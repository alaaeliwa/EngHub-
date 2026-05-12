document.addEventListener('DOMContentLoaded', () => {
    // Modal Interaction
    const modal = document.getElementById('createCourseModal');
    const openBtn = document.getElementById('openCreateCourse');
    const closeBtns = document.querySelectorAll('.close-modal');

    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Pricing Model Toggle
    const priceRadios = document.querySelectorAll('input[name="priceType"]');
    const priceInput = document.getElementById('priceInput');

    priceRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'paid') {
                priceInput.style.display = 'block';
                priceInput.classList.add('animate-in');
            } else {
                priceInput.style.display = 'none';
            }
        });
    });

    // Filter Button Interaction
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Form Submission Simulation
    const form = document.getElementById('createCourseForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Publishing...';

        // Simulate publishing delay
        setTimeout(() => {
            alert('Congratulations! Your course has been published and is now visible to the EngHub community.');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Publish Course';
            form.reset();
        }, 2000);
    });
});
