document.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.getElementById("sort");
    const productGrid = document.querySelector(".product-grid");
    const addButtons = document.querySelectorAll(".product-card button");

    let products = Array.from(document.querySelectorAll(".product-card")).map(card => ({
        element: card,
        name: card.querySelector("h3").innerText,
        price: parseInt(card.querySelector("p").innerText.match(/\d+/)[0])
    }));

  
    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            const selectedOption = sortSelect.value;

            if (selectedOption === "price-low-high") {
                products.sort((a, b) => a.price - b.price);
            } else if (selectedOption === "price-high-low") {
                products.sort((a, b) => b.price - a.price);
            } else if (selectedOption === "name-a-z") {
                products.sort((a, b) => a.name.localeCompare(b.name));
            } else if (selectedOption === "name-z-a") {
                products.sort((a, b) => b.name.localeCompare(a.name));
            }

          
            products.forEach(product => productGrid.appendChild(product.element));
        });
    }

    
    addButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productCard = event.target.closest(".product-card");
            const productName = productCard.getAttribute("data-name"); 
            const product = products.find(p => p.name === productName);
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

         
            const existingProduct = cart.find(item => item.name === product.name);
            if (existingProduct) {
                existingProduct.quantity += 1; 
            } else {
                cart.push({ name: product.name, price: product.price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${product.name} added to cart!`);

       
            window.location.href = "CartPage.html";
        });
    });

 
    if (window.location.pathname.includes("CartPage.html")) {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const cartTable = document.querySelector(".cart table");

   
        while (cartTable.rows.length > 1) {
            cartTable.deleteRow(1);
        }

        cartItems.forEach(item => {
            const row = cartTable.insertRow();
            row.innerHTML = `
                <td><img src="images/placeholder.png" alt="Product Image" width="50"></td>
                <td>${item.name}</td>
                <td>${item.price}SR</td>
                <td>
                    <div class="quantity">
                        <button class="decrease">-</button>
                        <input type="number" value="${item.quantity}" min="1">
                        <button class="increase">+</button>
                    </div>
                </td>
                <td><button class="remove-item">X</button></td>
            `;
        });

        // تحديث الإجمالي
        updateTotal();

      
        document.querySelectorAll(".remove-item").forEach((button, index) => {
            button.addEventListener("click", () => {
                cartItems.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cartItems));
                location.reload();
            });
        });

        document.querySelectorAll(".quantity .increase").forEach((button, index) => {
            button.addEventListener("click", () => {
                cartItems[index].quantity += 1;
                localStorage.setItem("cart", JSON.stringify(cartItems));
                location.reload();
            });
        });

        document.querySelectorAll(".quantity .decrease").forEach((button, index) => {
            button.addEventListener("click", () => {
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity -= 1;
                    localStorage.setItem("cart", JSON.stringify(cartItems));
                    location.reload();
                }
            });
        });
    }

    function updateTotal() {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        document.querySelector(".total span:last-child").innerText = `${total}SR`;
    }
});
