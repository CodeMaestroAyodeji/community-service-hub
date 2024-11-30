// logout.js  

// Logout functionality  
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
            // Clear the JWT token from localStorage  
            localStorage.removeItem('token');  

            // Redirect to the login page  
            window.location.href = 'login.html';  
        }  
    });  
}  

// Attach to any logout button with the class 'logout-btn'  
function attachLogoutListener() {  
    document.querySelectorAll('.logout-btn').forEach(button => {  
        button.addEventListener('click', handleLogout);  
    });  
}  

// Exporting the function to be used in other modules (optional)  
if (typeof module !== 'undefined') {  
    module.exports = { attachLogoutListener };  
}