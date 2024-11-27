// SweetAlert example
document.getElementById("alertButton").addEventListener("click", function() {
    Swal.fire({
        title: 'Thank You!',
        text: 'You are about to explore amazing volunteering opportunities in your community.',
        icon: 'info',
        confirmButtonText: 'Okay'
    });
});
