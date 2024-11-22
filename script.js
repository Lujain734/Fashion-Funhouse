document.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.getElementById("sort");
    const productGrid = document.querySelector(".product-grid");
    const addButtons = document.querySelectorAll(".product-card button");
       const deleteCartButton = document.querySelector(".delete");

    // قائمة المنتجات (كمصفوفة لتسهيل الترتيب)
    let products = Array.from(document.querySelectorAll(".product-card")).map(card => ({
        element: card,
        name: card.querySelector("h3").innerText,
        price: parseInt(card.querySelector("p").innerText.match(/\d+/)[0])
    }));

    // ترتيب المنتجات
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

            // إعادة ترتيب العناصر في الـ DOM
            products.forEach(product => productGrid.appendChild(product.element));
        });
    }

    // إضافة المنتجات إلى السلة وتحديث الكمية في Local Storage
    addButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productCard = event.target.closest(".product-card");
            const productName = productCard.getAttribute("data-name");
            const productImage = productCard.querySelector("img").src; // جلب مسار الصورة
            const productPrice = parseInt(productCard.querySelector("p").innerText.replace(/[^0-9]/g, ""));
           // const productPrice = parseInt(productCard.querySelector("p").innerText.match(/\d+/)[0]);
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
            const existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1,
                    image: productImage // إضافة مسار الصورة
                });
            }
    
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${productName} added to cart!`);
        });
    });
    

    // عرض محتويات السلة في صفحة CartPage
    if (window.location.pathname.includes("CartPage.html")) {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const cartTable = document.querySelector(".cart table");

        // إزالة المنتجات الافتراضية من الجدول
        while (cartTable.rows.length > 1) {
            cartTable.deleteRow(1);
        }

        // إضافة المنتجات المخزنة في السلة
        cartItems.forEach(item => {
            const row = cartTable.insertRow();
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
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
        

        // تحديث الإجمالي
        updateTotal();

        // وظيفة الأزرار "إزالة المنتج" و"زيادة/نقصان الكمية"
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
                cartItems[index].quantity -= 1; // تقليل الكمية
                localStorage.setItem("cart", JSON.stringify(cartItems)); // تحديث السلة في localStorage
                location.reload(); // إعادة تحميل الصفحة لتحديث العرض
            }
        });
    });

    // زر Clear Cart (حذف السلة بالكامل)
    deleteCartButton.addEventListener("click", () => {
        // حذف السلة بالكامل من localStorage
        localStorage.removeItem("cart");
        
        // حذف جميع الصفوف من الجدول
        cartTable.innerHTML = ""; 
        
        // إعادة تعيين الإجمالي إلى صفر
        //totalElement.innerText = "0 SR";
        updateTotal()

        // عرض رسالة للمستخدم
        //alert("Cart has been cleared!");
    });
    function updateTotal() {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        document.querySelector(".total span:last-child").innerText = `${total}SR`;
    }
}});

