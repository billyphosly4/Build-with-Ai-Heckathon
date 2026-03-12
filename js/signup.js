const signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirmPassword').value;

        if (password !== confirm) {
            alert("Passwords do not match!");
            return;
        }

        console.log("Account created for:", document.getElementById('email').value);
        alert("Success! Redirecting to login...");
        window.location.href = "login.html";
    });
}