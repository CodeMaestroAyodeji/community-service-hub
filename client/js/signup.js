document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const data = {
        name: name,
        email: email,
        password: password,
        role: role
    };

    // Show the spinner while the API call is in progress
    document.getElementById("spinner").style.display = "block";

    // Make the API call to the backend
    fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Hide the spinner
        document.getElementById("spinner").style.display = "none";

        if (data.message && data.message.includes('User registered successfully')) {
            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'Your account has been created successfully. Check your email to verify your account.',
                icon: 'success',
                confirmButtonText: 'Okay'
            }).then(() => {
                window.location.href = 'login.html'; // Redirect to login page
            });
        } else if (data.error) {
            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: data.error || 'Something went wrong.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    })
    .catch(error => {
        // Hide the spinner and show error message
        document.getElementById("spinner").style.display = "none";
        console.error('Error:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
    });
});
