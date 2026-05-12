document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 3;

    // Navigation Logic
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.steps-progress-wrapper .step');

    const updateStep = (newStep) => {
        // Validation check (basic)
        if (newStep > currentStep) {
            const currentFields = steps[currentStep - 1].querySelectorAll('[required]');
            let valid = true;
            currentFields.forEach(field => {
                if (!field.value) {
                    field.style.borderColor = '#ef4444';
                    valid = false;
                } else {
                    field.style.borderColor = '#f1f5f9';
                }
            });
            if (!valid) return;
        }

        // Hide current step
        steps[currentStep - 1].classList.remove('active');
        stepIndicators[currentStep - 1].classList.remove('active');
        if (newStep > currentStep) stepIndicators[currentStep - 1].classList.add('completed');

        // Show new step
        currentStep = newStep;
        steps[currentStep - 1].classList.add('active');
        stepIndicators[currentStep - 1].classList.add('active');
        stepIndicators[currentStep - 1].classList.remove('completed');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    nextBtns.forEach(btn => btn.addEventListener('click', () => updateStep(currentStep + 1)));
    prevBtns.forEach(btn => btn.addEventListener('click', () => updateStep(currentStep - 1)));

    // Dynamic Lessons
    const lessonsContainer = document.getElementById('lessonsContainer');
    const addLessonBtn = document.getElementById('addLessonBtn');
    let lessonCount = 1;

    addLessonBtn.addEventListener('click', () => {
        lessonCount++;
        const lessonHtml = `
            <div class="form-card lesson-card animate-in">
                <div class="lesson-header">
                    <h3>Lesson ${lessonCount}: New Lesson</h3>
                    <button type="button" class="btn-icon remove-lesson"><i class="fa-solid fa-trash-can"></i></button>
                </div>
                <div class="card-body">
                    <div class="input-group full-width">
                        <label>Lesson Title</label>
                        <input type="text" placeholder="e.g. Setting up the environment">
                    </div>
                    <div class="content-sources grid-2">
                        <div class="source-item">
                            <label><i class="fa-solid fa-video"></i> Video Content</label>
                            <div class="file-mini-upload">
                                <span>Select Video</span>
                                <input type="file">
                            </div>
                        </div>
                        <div class="source-item">
                            <label><i class="fa-solid fa-file-pdf"></i> Lesson Notes</label>
                            <div class="file-mini-upload">
                                <span>Upload PDF</span>
                                <input type="file">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        lessonsContainer.insertAdjacentHTML('beforeend', lessonHtml);
    });

    // Remove Lesson
    lessonsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.remove-lesson')) {
            e.target.closest('.lesson-card').remove();
            // Re-index remaining lessons
            const titles = lessonsContainer.querySelectorAll('.lesson-header h3');
            titles.forEach((t, i) => t.textContent = `Lesson ${i + 1}: ${t.textContent.split(': ')[1] || 'New Lesson'}`);
            lessonCount = titles.length;
        }
    });

    // Pricing Toggle
    const priceAmountSection = document.getElementById('priceAmountSection');
    const priceRadios = document.querySelectorAll('input[name="coursePrice"]');

    priceRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            priceAmountSection.style.display = e.target.value === 'paid' ? 'block' : 'none';
        });
    });

    // Form Submit
    const form = document.getElementById('createCourseForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        // Simulate publishing with a premium feel
        setTimeout(() => {
            // Create a custom success overlay
            const overlay = document.createElement('div');
            overlay.className = 'success-overlay animate-in';
            overlay.innerHTML = `
                <div class="success-card">
                    <div class="success-icon"><i class="fa-solid fa-circle-check"></i></div>
                    <h2>Course Submitted!</h2>
                    <p>Your course is now in the review queue. We'll notify you as soon as it's live on the marketplace.</p>
                    <button class="btn btn-primary" onclick="window.location.href='peer-teaching.html'">Go to Marketplace</button>
                </div>
            `;
            document.body.appendChild(overlay);
        }, 1500);
    });
});
