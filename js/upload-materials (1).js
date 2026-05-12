document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic (File vs Link)
    const tabBtns = document.querySelectorAll('.upload-tabs .tab-btn');
    const sourceViews = document.querySelectorAll('.source-view');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const source = btn.getAttribute('data-source');
            
            // Update tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update views
            sourceViews.forEach(v => v.classList.remove('active'));
            document.getElementById(`${source}UploadSource`).classList.add('active');
        });
    });

    // File Selection Simulation
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const filePreview = document.getElementById('filePreview');
    const fileNameDisplay = document.getElementById('fileName');
    const removeFileBtn = document.getElementById('removeFile');

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            fileNameDisplay.textContent = file.name;
            dropZone.style.display = 'none';
            filePreview.style.display = 'flex';
        }
    });

    removeFileBtn.addEventListener('click', () => {
        fileInput.value = '';
        dropZone.style.display = 'flex';
        filePreview.style.display = 'none';
    });

    // Form Submission Simulation
    const form = document.getElementById('uploadMaterialForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading...';

        // Simulate API delay
        setTimeout(() => {
            alert('Success! Your material has been uploaded and added to the course repository.');
            window.location.href = 'courses.html';
        }, 1500);
    });

    // Drag and Drop Effects
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--primary)';
            dropZone.style.backgroundColor = '#f0f9f9';
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '#cbd5e1';
            dropZone.style.backgroundColor = '#f8fafc';
        }, false);
    });
});
