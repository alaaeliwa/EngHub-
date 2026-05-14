document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching
    const tabs = document.querySelectorAll('.p-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(`${tabId}Tab`);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // Profile Editing Logic
    const editBtn = document.getElementById('editProfileBtn');
    const saveBtn = document.getElementById('saveProfileBtn');
    const nameDisplay = document.getElementById('userNameDisplay');
    const roleDisplay = document.getElementById('userRoleDisplay');
    const aboutDisplay = document.getElementById('userAboutDisplay');

    // Image Uploads
    const avatarInput = document.getElementById('avatarInput');
    const coverInput = document.getElementById('coverInput');
    const avatarImg = document.getElementById('userAvatarImg');
    const coverImg = document.getElementById('userCoverImg');
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    const changeCoverBtn = document.getElementById('changeCoverBtn');

    // Trigger File Inputs
    changeAvatarBtn.addEventListener('click', () => avatarInput.click());
    changeCoverBtn.addEventListener('click', () => coverInput.click());

    // Image Previews
    [avatarInput, coverInput].forEach(input => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (input === avatarInput) avatarImg.src = event.target.result;
                    else coverImg.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // Toggle Edit Mode
    editBtn.addEventListener('click', () => {
        const fields = [nameDisplay, roleDisplay, aboutDisplay];
        fields.forEach(field => {
            field.contentEditable = true;
            field.classList.add('editing');
        });
        nameDisplay.focus();

        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-flex';
    });

    // Save Changes
    saveBtn.addEventListener('click', () => {
        const fields = [nameDisplay, roleDisplay, aboutDisplay];
        fields.forEach(field => {
            field.contentEditable = false;
            field.classList.remove('editing');
        });

        saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
        
        setTimeout(() => {
            saveBtn.innerHTML = '<i class="fa-solid fa-check"></i> Save Changes';
            saveBtn.style.display = 'none';
            editBtn.style.display = 'inline-flex';
            showToast('Profile updated successfully!', 'success');
        }, 1000);
    });
});
