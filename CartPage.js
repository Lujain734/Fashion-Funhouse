document.addEventListener("DOMContentLoaded", () => {
    var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    var cartTable = document.querySelector(".cart table");
    var totalElement = document.querySelector(".total span:last-child");
    var cart = document.getElementsByClassName("cart")[0].getElementsByTagName("tbody")[0];
    var totalAmountElement = document.getElementsByClassName("total-amount")[0];
    var deleteCartButton = document.getElementsByClassName("delete")[0];
    var checkoutButton = document.getElementsByClassName("checkout")[0];

    // Remove default products from the table
    while (cartTable.rows.length > 1) {
        cartTable.deleteRow(1);
    }

    // Add stored cart items to the table
    cartItems.forEach((item, index) => {
        var row = cartTable.insertRow();
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" alt="Product Image" width="50"></td>
            <td>${item.name}</td>
            <td>${item.price} SR</td>
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

    // Update the total
    calculateTotal();

    // Button functions: remove item, increase/decrease quantity
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


    // Function to calculate the total
    function calculateTotal() {
        let total = 0;
        const rows = cart.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            var row = rows[i];
            var price = parseInt(row.getElementsByClassName("price")[0].textContent.replace('SR', '').trim());
            var quantity = parseInt(row.getElementsByClassName("quantity")[0].getElementsByTagName("input")[0].value);
            total += price * quantity;
        }
        totalAmount.textContent = total ;
    }
    /*// Calculate and update the total
    function updateTotal() {
        var total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalElement.innerText = `${total} SR`;
        totalAmountElement.textContent = total;
    }*/

    // Clear all items
    function clearCart() {
        cart.innerHTML = '';
        calculateTotal();
    }

    // Checkout
    function checkout() {
        alert('Purchasing process successful!\n\nTotal: ' + totalAmountElement.textContent + ' SR');
        window.location.href = 'ProductEvaluation.html';
    }

    // Event listeners
    cart.addEventListener('click', handleCartClick);
    deleteCartButton.addEventListener('click', clearCart);
    checkoutButton.addEventListener('click', checkout);

    function handleCartClick(event) {
        if (event.target.classList.contains('increase') || event.target.classList.contains('decrease')) {
            var input = event.target.closest('.quantity').querySelector('input');
            let quantity = parseInt(input.value);

            if (event.target.classList.contains('increase')) {
                input.value = quantity + 1;
            } else if (event.target.classList.contains('decrease') && quantity > 1) {
                input.value = quantity - 1;
            }
            calculateTotal();
        }

        if (event.target.classList.contains('remove-item')) {
            event.target.closest('tr').remove();
            calculateTotal();
        }
    }
});


/*//cart page

document.addEventListener('DOMContentLoaded', () => {
    var cart = document.getElementsByClassName("cart")[0].getElementsByTagName("tbody")[0];
    var totalAmount = document.getElementsByClassName("total-amount")[0];
    var deleteCartButton = document.getElementsByClassName("delete")[0];
    var checkoutButton = document.getElementsByClassName("checkout")[0];

    // Function to calculate the total
    function calculateTotal() {
        let total = 0;
        const rows = cart.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            var row = rows[i];
            var price = parseInt(row.getElementsByClassName("price")[0].textContent.replace('SR', '').trim());
            var quantity = parseInt(row.getElementsByClassName("quantity")[0].getElementsByTagName("input")[0].value);
            total += price * quantity;
        }
        totalAmount.textContent = total ;
    }

    // Update quantity and remove item
    function handleCartClick(event) {
        if (event.target.classList.contains('increase') || event.target.classList.contains('decrease')) {
            var input = event.target.closest('.quantity').querySelector('input');
            let quantity = parseInt(input.value);

            if (event.target.classList.contains('increase')) {
                input.value = quantity + 1;
            } else if (event.target.classList.contains('decrease') && quantity > 1) {
                input.value = quantity - 1;
            }
            calculateTotal();
        }

        if (event.target.classList.contains('remove-item')) {
            event.target.closest('tr').remove();
            calculateTotal();
        }
    }

    // Clear all items
    function clearCart() {
        cart.innerHTML = ''; // Remove all rows
        calculateTotal();
    }

    // Checkout
    function checkout() {
        alert('Purchasing process successful!\n\nTotal: ' + totalAmount.textContent + ' SR');
        window.location.href = 'ProductEvaluation.html'; // Redirect to evaluation page
    }

    // Event listeners
    cart.addEventListener('click', handleCartClick);
    deleteCartButton.addEventListener('click', clearCart);
    checkoutButton.addEventListener('click', checkout);

    // Recalculate total on page load
    calculateTotal();
});*/
