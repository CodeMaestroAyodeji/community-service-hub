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
            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'You have logged in successfully.',
                icon: 'success',
                confirmButtonText: 'Okay'
            }).then(() => {
                window.location.href = 'dashboard.html'; // Redirect to dashboard
            });
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
