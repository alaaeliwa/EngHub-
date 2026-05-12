document.addEventListener('DOMContentLoaded', () => {
    // Handle Login Form
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add a simple loading state to the button
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Signing in...';
            submitBtn.disabled = true;

            // Simulate a short delay then redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 800);
        });
    }

    // Handle Register Form
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add a simple loading state to the button
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;

            // Simulate a short delay then redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }

    // Handle Forgot Password Form
    const forgotForm = document.querySelector('.forgot-form');
    if (forgotForm) {
        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = forgotForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Reset link has been sent to your email!');
                window.location.href = 'login.html';
            }, 1200);
        });
    }
});
