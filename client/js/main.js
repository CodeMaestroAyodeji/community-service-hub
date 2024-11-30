// SweetAlert example
document.getElementById("alertButton").addEventListener("click", function() {
    Swal.fire({
        title: 'Thank You!',
        text: 'You are about to explore amazing volunteering opportunities in your community.',
        icon: 'info',
        confirmButtonText: 'Okay'
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Logout functionality
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", handleLogout);
    }
});

function handleLogout() {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out and redirected to the login page.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Logout',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Clear the JWT token from localStorage or sessionStorage
            localStorage.removeItem('token');

            // Redirect to the login page
            window.location.href = 'login.html';

            Swal.fire({
                title: 'Logged Out',
                text: 'You have been successfully logged out.',
                icon: 'success',
                confirmButtonText: 'Okay'
            });
        }
    });
}

