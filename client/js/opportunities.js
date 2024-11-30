document.addEventListener("DOMContentLoaded", function () {
    // Attach the logout listener for all pages  
    attachLogoutListener();  

    const searchInput = document.getElementById("search");
    const opportunitiesList = document.getElementById("opportunitiesList");

    const fetchOpportunities = (keyword = "") => {
        fetch(`http://localhost:5000/api/opportunities?keyword=${keyword}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                opportunitiesList.innerHTML = "";
                if (data.length > 0) {
                    data.forEach((opportunity) => {
                        const item = document.createElement("a");
                        item.href = `opportunity-details.html?id=${opportunity.id}`;
                        item.className = "list-group-item list-group-item-action";
                        item.innerHTML = `
                            <h5>${opportunity.title}</h5>
                            <p>${opportunity.description}</p>
                            <small>${opportunity.location} | ${new Date(opportunity.date).toLocaleDateString()}</small>
                        `;
                        opportunitiesList.appendChild(item);
                    });
                } else {
                    opportunitiesList.innerHTML = `<p class="text-center text-muted">No opportunities found.</p>`;
                }
            })
            .catch((error) => {
                console.error("Error fetching opportunities:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Unable to fetch opportunities. Please try again later.",
                    icon: "error",
                    confirmButtonText: "Okay",
                });
            });
    };

    // Fetch all opportunities on page load
    fetchOpportunities();

    // Search opportunities on input
    searchInput.addEventListener("input", function () {
        fetchOpportunities(searchInput.value);
    });
});
