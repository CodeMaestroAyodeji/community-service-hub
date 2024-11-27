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
        if (data.message === 'User registered successfully') {
            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'Your account has been created successfully.',
                icon: 'success',
                confirmButtonText: 'Okay'
            }).then(() => {
                window.location.href = 'login.html'; // Redirect to login page
            });
        } else {
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
        console.error('Error:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
    });
});
