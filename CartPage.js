//cart page

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
});
