document.addEventListener("DOMContentLoaded", function () {  
    // Attach the logout listener for all pages  
    attachLogoutListener();  

    const savedOpportunitiesEl = document.getElementById("savedOpportunities");  
    const messagesSentEl = document.getElementById("messagesSent");  
    const notificationsEl = document.getElementById("notifications");  
    
    const updateProfileForm = document.getElementById("updateProfileForm");  
    const changePasswordForm = document.getElementById("changePasswordForm");  
    
    const token = localStorage.getItem("token");  
    
       

    // Fetch Metrics for Volunteer Dashboard  
    fetch("http://localhost:5000/api/metrics/volunteer", {  
        headers: {  
            Authorization: `Bearer ${token}`, // Corrected backticks  
        },  
    })  
        .then((response) => response.json())  
        .then((data) => {  
            savedOpportunitiesEl.textContent = data.savedOpportunities || 0;  
            messagesSentEl.textContent = data.messagesSent || 0;  
            notificationsEl.textContent = data.notifications || 0;  
        })  
        .catch((error) => console.error("Error fetching metrics:", error));  

    // Update Profile  
    updateProfileForm.addEventListener("submit", function (event) {  
        event.preventDefault();  

        const name = document.getElementById("updateName").value;  
        const email = document.getElementById("updateEmail").value;  

        fetch("http://localhost:5000/api/users/profile", {  
            method: "PUT",  
            headers: {  
                "Content-Type": "application/json",  
                Authorization: `Bearer ${token}`, // Corrected backticks  
            },  
            body: JSON.stringify({ name, email }),  
        })  
            .then((response) => response.json())  
            .then((data) => {  
                Swal.fire("Success", "Profile updated successfully!", "success");  
            })  
            .catch((error) => {  
                console.error("Error updating profile:", error);  
                Swal.fire("Error", "Failed to update profile.", "error");  
            });  
    });  

    // Change Password  
    changePasswordForm.addEventListener("submit", function (event) {  
        event.preventDefault();  

        const old_password = document.getElementById("currentPassword").value;  
        const new_password = document.getElementById("newPassword").value;  

        fetch("http://localhost:5000/api/users/password", {  
            method: "PUT",  
            headers: {  
                "Content-Type": "application/json",  
                Authorization: `Bearer ${token}`, // Corrected backticks  
            },  
            body: JSON.stringify({ old_password, new_password }),  
        })  
            .then((response) => response.json())  
            .then((data) => {  
                Swal.fire("Success", "Password changed successfully!", "success");  
            })  
            .catch((error) => {  
                console.error("Error changing password:", error);  
                Swal.fire("Error", "Failed to change password.", "error");  
            });  
    });  

    // // Logout functionality  
    // function handleLogout() {  
    //     Swal.fire({  
    //         title: 'Are you sure?',  
    //         text: 'You will be logged out and redirected to the login page.',  
    //         icon: 'warning',  
    //         showCancelButton: true,  
    //         confirmButtonText: 'Logout',  
    //         cancelButtonText: 'Cancel'  
    //     }).then((result) => {  
    //         if (result.isConfirmed) {  
    //             // Clear the JWT token from localStorage or sessionStorage  
    //             localStorage.removeItem('token');  

    //             // Redirect to the login page  
    //             window.location.href = 'login.html';  

    //             // Show logout confirmation (this will not display due to immediate redirection)  
    //             // You could place this Swal.fire here if needed before redirection  
    //             // Swal.fire({  
    //             //     title: 'Logged Out',  
    //             //     text: 'You have been successfully logged out.',  
    //             //     icon: 'success',  
    //             //     confirmButtonText: 'Okay'  
    //             // });  
    //         }  
    //     });  
    // }  

    // // Attach to any logout button  
    // document.querySelectorAll('.logout-btn').forEach(button => {  
    //     button.addEventListener('click', handleLogout);  
    // });  
});
                