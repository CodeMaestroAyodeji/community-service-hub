document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
        email: email,
        password: password
    };

    // Make the API call to the backend
    fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            // Check role and redirect to respective dashboard
            if (data.role === 'volunteer') {
                window.location.href = 'volunteer-dashboard.html';
            } else if (data.role === 'organization') {
                window.location.href = 'organization-dashboard.html';
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Unknown role detected. Please contact support.',
                    icon: 'error',
                    confirmButtonText: 'Okay'
                });
            }
        } else {
            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: data.error || 'Invalid credentials.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
    });
});
