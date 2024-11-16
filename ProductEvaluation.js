
  
// Product Evaluation page

document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");
    const submitBtn = document.getElementById("submitBtn");
    const orderSelect = document.getElementById("order");
    const productSelect = document.getElementById("product");
    let selectedRating = 0;

    // Handle star rating selection
    stars.forEach((star) => {
        star.addEventListener("click", () => {
            selectedRating = parseInt(star.dataset.value); // Get the star's value
            stars.forEach((s) => s.classList.remove("selected")); // Reset selected
            for (let i = 0; i < selectedRating; i++) {
                stars[i].classList.add("selected"); // Highlight selected stars
            }
        });
    });

    // Attach the submit method to the submit button
    submitBtn.addEventListener("click", () => {
        handleSubmit(orderSelect, productSelect, selectedRating);
    });
});

// Method to handle the form submission
function handleSubmit(orderSelect, productSelect, selectedRating) {
    const orderValue = orderSelect.value;
    const productValue = productSelect.value;

    // Validate that both order and product are selected
    if (orderValue == "" || productValue == "") {
        alert("Please select both an order and a product.");
        return;
    }

    // Validate that a rating is chosen
    if (selectedRating == 0) {
        alert("Please choose a rating.");
        return;
    }

    // Show confirmation and redirect to the home page
    alert(`Thank you for your feedback!\nYour rating for product ${productValue} is ${selectedRating}.`);
    window.location.href = "http://lujain734.github.io/Fashion-Funhouse/index.html"; // Replace with the actual home page URL
}

