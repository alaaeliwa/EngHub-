document.addEventListener('DOMContentLoaded', () => {
    // Location Type Toggle Logic
    const locationTypeRadios = document.querySelectorAll('input[name="locationType"]');
    const locationLabel = document.getElementById('locationLabel');
    const locationInput = document.getElementById('workshopLocation');

    locationTypeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'online') {
                locationLabel.innerHTML = 'Meeting Link <span class="required">*</span>';
                locationInput.placeholder = 'Enter Zoom, Meet, or Teams link...';
            } else {
                locationLabel.innerHTML = 'Physical Location <span class="required">*</span>';
                locationInput.placeholder = 'Enter Building, Hall, or Room Number...';
            }
        });
    });

    // Simple Banner Upload Click Simulation
    const uploadArea = document.getElementById('bannerUpload');
    const fileInput = document.getElementById('bannerFile');

    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            uploadArea.querySelector('p').textContent = `File selected: ${fileName}`;
            uploadArea.style.borderColor = 'var(--primary)';
            uploadArea.style.backgroundColor = '#f0f9f9';
        }
    });

    // Form Submission Simulation
    const form = document.getElementById('createWorkshopForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state on button
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating...';

        // Simulate API Call
        setTimeout(() => {
            // Show Success Notification (using alert for demo, but styled logic can be added later)
            alert('Success! Workshop "' + document.getElementById('workshopTitle').value + '" has been created and is now live on the platform.');
            
            // Redirect to workshops list
            window.location.href = 'workshops.html';
        }, 1500);
    });
});
