<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cart Page</title>
    <link rel="stylesheet" href="Style.css">
</head>
<body>
    <header>
        <div class="header-container">
            <img src="images/logo.png" alt="Website Logo" id="logo">
            <h1>Fashion & Funhouse</h1>
            <p class="vision-statement">Our vision is to create a joyful shopping experience!</p>
        </div>
    </header>
    <nav class="nav-bar">
        <ul class="nav-menu">
            <li><a href="Seller'sDashboard.html" accesskey="d">Seller's Dashboard</a></li>
            <li><a href="UserPage.html" accesskey="u">Users</a></li>
            <li><a href="Toys.html" accesskey="t">Toys</a></li>
            <li><a href="Clothes.html" accesskey="h">Clothes</a></li>
            <li><a href="Makeup.html" accesskey="m">Makeup</a></li>
            <li><a href="CartPage.html" id="cartLink" accesskey="y">Cart</a></li>
        </ul>
    </nav>
    <main>

        <nav aria-label="Breadcrumb">
        <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="http://lujain734.github.io/Fashion-Funhouse/index.html">Home</a></li>
        <li class="breadcrumb-item"><a href="UserPage.html">User Page</a></li>
        <li class="breadcrumb-item active" aria-current="page">Cart Page</li>
        </ol>
        </nav>
        
        
        <h1>Cart Page</h1>
        
        
        <div class="cart">
        
        <button class="delete">Delete Cart</button>
        
        <table>
        <thead>
        <tr>
        <th></th>
        <th></th>
        <th>Each</th>
        <th>Quantity</th>
        <th></th>
        </tr>
        </thead>
		
		<tbody>
        <tr>
        <td><img src="images/11Foundation.jpg" alt="Product Image"></td>
        <td>Foundation </td>
        <td class="price">50SR</td>
        <td>
        <div class="quantity">
        <button class="decrease">-</button>
        <input type="number" value="1" min="1">
        <button class="increase">+</button>
        </div>
        </td>
        <td>
        <button class="remove-item">X</button>
        </td>
        </tr>
        
        <tr>
        <td><img src="images/11Concealer.jpg" alt="Product Image"></td>
        <td>Concealer</td>
        <td class="price">40SR</td>
        <td>
        <div class="quantity">
        <button class="decrease">-</button>
        <input type="number" value="1" min="1">
        <button class="increase">+</button>
        </div>
        </td>
        <td>
        <button class="remove-item">X</button>
        </td>
        </tr>
        </tbody>
		
        </table>
        </div>
		
        <div class="total">
        <span>Total:</span><span class="total-amount">90</span> 
        </div>
        
        <button class="checkout"  >Checkout</button> <!--onclick="document.getElementById('checkoutB').click();"-->
    
        </main>

    <footer>
        <div class="footer-container">
            <p class="copyright">Copyright &copy; 2024 Fashion & Funhouse. All rights reserved.</p>
            <div class="contact-info">
                <p>Contact Us:</p>
                <div class="contact-item">
                    <img src="images/phone.png" alt="Phone Icon" class="icon">
                    <span>+966111111</span>
                </div>
                <div class="contact-item">
                    <img src="images/telephone2.png" alt="Mobile Icon" class="icon">
                    <span>+01134657</span>
                </div>
                <div class="contact-item">
                    <img src="images/Email-removebg-preview.png" alt="Email Icon" class="icon">
                    <span>Fashion&amp;Funhouse@gmail.com</span>
                </div>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
    <script src="CartPage.js"></script>
    <script src="edits.js"></script> 
</body>
</html>
<script>
    document.addEventListener("DOMContentLoaded", () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const cartTable = document.querySelector(".cart table");
        const totalElement = document.querySelector(".total span:last-child");
    
        // إزالة المنتجات الافتراضية من الجدول
        while (cartTable.rows.length > 1) {
            cartTable.deleteRow(1);
        }
    
        // إضافة المنتجات المخزنة في السلة إلى الجدول
        cartItems.forEach((item, index) => {
            const row = cartTable.insertRow();
            row.innerHTML = `
                <td><img src="images/placeholder.png" alt="Product Image" width="50"></td>
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
    
        // تحديث إجمالي السعر
        updateTotal();
    
        // وظائف الأزرار "إزالة المنتج" و"زيادة/نقصان الكمية"
        document.querySelectorAll(".remove-item").forEach((button, index) => {
            button.addEventListener("click", () => {
                cartItems.splice(index, 1); // إزالة المنتج من السلة
                localStorage.setItem("cart", JSON.stringify(cartItems)); // تحديث السلة في localStorage
                location.reload(); // إعادة تحميل الصفحة لتحديث العرض
            });
        });
    
        document.querySelectorAll(".quantity .increase").forEach((button, index) => {
            button.addEventListener("click", () => {
                cartItems[index].quantity += 1; // زيادة الكمية
                localStorage.setItem("cart", JSON.stringify(cartItems)); // تحديث السلة في localStorage
                location.reload(); // إعادة تحميل الصفحة لتحديث العرض
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
    
        // دالة لحساب وتحديث الإجمالي
        function updateTotal() {
            const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            totalElement.innerText = `${total} SR`;
        }
    });
    </script>
