 document.addEventListener("DOMContentLoaded", function () {
        // Function to load products from local storage
        function loadProducts() {
            const products = JSON.parse(localStorage.getItem("products")) || [];
            const productsGrid = document.querySelector(".products-grid");

            // Clear existing products in the grid
            productsGrid.innerHTML = "";

            // Display each product
            products.forEach((product) => {
                const productBox = document.createElement("div");
                productBox.classList.add("product-box");

                productBox.innerHTML = `
                    <img src="${product.photo}" alt="${product.name}" class="product-image">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Quantity: ${product.quantity}</p>
                `;
                productsGrid.appendChild(productBox);
            });
        }

        // Load products on page load
        loadProducts();
    });
