document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    let currentTheme = 'light';

    themeToggle.addEventListener('click', function() {
        if (currentTheme === 'light') {
            // تغيير إلى الثيم الداكن
            currentTheme = 'dark';
            document.body.style.backgroundColor = '#2c3e50'; // لون خلفية داكن
            document.body.style.color = '#ecf0f1'; // لون نص فاتح

            // تغيير ألوان كل الحاويات
            const containers = document.querySelectorAll('header, .nav-bar, #offers, #categories, #reviews, footer, .offer, .category-item, .review');
            containers.forEach(container => {
                container.style.backgroundColor = '#34495e'; // لون خلفية الحاويات
                container.style.color = '#ecf0f1'; // لون نص الحاويات
            });

            // تغيير لون الفوتر بشكل خاص
            const footer = document.querySelector('footer');
            if (footer) {
                footer.style.backgroundColor = '#34495e'; // لون خلفية الفوتر
                footer.style.color = '#ecf0f1'; // لون نص الفوتر
            }

            // تغيير نص رؤية الشركة
            const visionStatement = document.querySelector('.vision-statement');
            if (visionStatement) {
                visionStatement.style.color = '#ecf0f1'; // لون نص الرؤية
            }

            // تغيير ألوان العناوين
            const titles = document.querySelectorAll('h1, h2');
            titles.forEach(title => {
                title.style.color = '#ecf0f1'; // لون العناوين
            });

            // تغيير ألوان الروابط
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.style.color = '#ecf0f1'; // لون الروابط في الثيم الداكن
            });

        } else {
            // العودة إلى الثيم الفاتح
            currentTheme = 'light';
            document.body.style.backgroundColor = '#fbf3f1'; // لون خلفية فاتح
            document.body.style.color = '#800080'; // لون نص داكن

            // إعادة ألوان كل الحاويات
            const containers = document.querySelectorAll('header, .nav-bar, #offers, #categories, #reviews, footer, .offer, .category-item, .review');
            containers.forEach(container => {
                container.style.backgroundColor = '#eedede'; // لون خلفية الحاويات
                container.style.color = '#800080'; // لون نص الحاويات
            });

            // إعادة لون الفوتر بشكل خاص
            const footer = document.querySelector('footer');
            if (footer) {
                footer.style.backgroundColor = '#eedede'; // لون خلفية الفوتر
                footer.style.color = '#800080'; // لون نص الفوتر
            }

            // إعادة نص رؤية الشركة
            const visionStatement = document.querySelector('.vision-statement');
            if (visionStatement) {
                visionStatement.style.color = '#800080'; // لون نص الرؤية
            }

            // إعادة ألوان العناوين
            const titles = document.querySelectorAll('h1, h2');
            titles.forEach(title => {
                title.style.color = '#800080'; // لون العناوين
            });

            // إعادة ألوان الروابط
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.style.color = '#800080'; // لون الروابط في الثيم الفاتح
            });
        }
    });

    // زر المزيد من العروض
    const moreOffersButton = document.getElementById('moreOffers');
    moreOffersButton.addEventListener('click', function() {
        const hiddenOffers = document.querySelectorAll('.offer[style*="display: none"]');
        hiddenOffers.forEach(offer => {
            offer.style.display = 'block'; // عرض العروض المخفية
        });
        moreOffersButton.style.display = 'none'; // إخفاء زر "المزيد من العروض"
    });
});