document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission

        // Retrieve form values
        const name = document.getElementById("name").value.trim();
        const photoFile = document.getElementById("photo").files[0];
        const price = document.getElementById("price").value.trim();
        const category = document.getElementById("category").value.trim();
        const description = document.getElementById("description").value.trim();
        const quantity = document.getElementById("quantity").value.trim();

        // Validation
        if (!name || !photoFile || !price || !category || !description || !quantity) {
            alert("Please fill out all fields.");
            return;
        }
        if (!/^[a-zA-Z]/.test(name)) {
            alert("The product name must start with a letter.");
            return;
        }
        if (isNaN(price) || isNaN(quantity)) {
            alert("Price and quantity must be numbers.");
            return;
        }

        // Read the photo file as a Base64 string
        const reader = new FileReader();
        reader.onloadend = function () {
            const photo = reader.result; // Get the Base64 string

            // Create product object
            const newProduct = {
                name,
                photo,
                price,
                category,
                description,
                quantity,
            };

            // Save product to local storage
            const products = JSON.parse(localStorage.getItem("products")) || [];
            products.push(newProduct);
            localStorage.setItem("products", JSON.stringify(products));

            // Success message and reset form
            alert(`Product "${name}" added successfully!`);
            form.reset();
        };
        reader.readAsDataURL(photoFile); // Start reading the file
    });
});
