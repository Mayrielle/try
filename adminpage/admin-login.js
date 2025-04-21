// Simple admin login functionality (for demo purposes)
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            // For demonstration purposes only - in a real app, you would authenticate with a server
            if (username === 'admin' && password === 'password') {
                // Set a flag in localStorage to indicate the user is logged in
                localStorage.setItem('adminLoggedIn', 'true');
                
                // Redirect to admin dashboard
                window.location.href = 'admin-dashboard.html';
            } else {
                // Show error message
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Invalid username or password';
            }
        });
    }
    
    // Check if user is already logged in
    const checkAuth = function() {
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        const isLoginPage = window.location.pathname.includes('admin-login.html');
        const isAdminPage = window.location.pathname.includes('admin-');
        
        if (isAdminPage && !isLoginPage && !isLoggedIn) {
            // Redirect to login page if not logged in and trying to access admin pages
            window.location.href = 'admin-login.html';
        } else if (isLoginPage && isLoggedIn) {
            // Redirect to dashboard if already logged in and on login page
            window.location.href = 'admin-dashboard.html';
        }
    };
    
    // Run auth check
    checkAuth();
});

// Logout function
function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin-login.html';
}