document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            const loginButton = loginForm.querySelector('.btn-login');
            loginButton.innerText = 'Signing in...';
            loginButton.disabled = true;

            setTimeout(() => {
                console.log('Login attempt:', { email, password });
                
                alert('Login Successful!');
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}