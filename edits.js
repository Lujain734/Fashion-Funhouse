document.addEventListener("DOMContentLoaded", () => {
    // Immediately apply the saved theme preference on page load
    let isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    document.body.classList.toggle('dark-theme', isDarkTheme);
    updateCategoryHeadingColor(isDarkTheme); // Set initial color based on theme
});

// Function to update category heading color
function updateCategoryHeadingColor(isDark) {
    const categoryHeadings = document.querySelectorAll('h2');
    categoryHeadings.forEach(h2 => {
        h2.style.color = isDark ? 'white' : '#800080'; // Change color based on theme
    });
}

 // Function to calculate and display the first day of the current week
 function getFirstDayOfCurrentWeek() {
    const today = new Date(); // Get the current date
    const dayOfWeek = today.getDay(); // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const firstDayOfWeek = new Date(today); // Create a new date object based on today
    
    // Calculate the most recent Sunday (first day of the week)
    firstDayOfWeek.setDate(today.getDate() - dayOfWeek);
    
    // Format the date to a readable format (e.g., "Sunday, February 7, 2023")
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return firstDayOfWeek.toLocaleDateString('en-US', options);
}

// Display the first day of the week in the HTML element
document.getElementById('current-date').innerText = getFirstDayOfCurrentWeek();

// More Offers functionality
const moreOffersButton = document.getElementById('moreOffers');
if (moreOffersButton) {
    moreOffersButton.addEventListener('click', function() {
        const hiddenOffers = document.querySelectorAll('.offer[style*="display: none"]');
        hiddenOffers.forEach(offer => {
            offer.style.display = 'block'; // Show hidden offers
        });
        moreOffersButton.style.display = 'none'; // Hide the button
    });
}

// Reviews hover effect to show details
const reviews = document.querySelectorAll('.review');
    reviews.forEach(review => {
        // Create the details div but keep it hidden initially
        const details = document.createElement('div');
        details.className = 'review-details';
        details.style.display = 'none'; // Initially hidden

        const reviewerName = review.querySelector('.reviewer strong').textContent;
        const productName = review.querySelector('.product-').textContent;
        const rating = review.querySelector('.rating').textContent;
        const feadback = review.querySelector('.review-text').textContent;

        details.innerHTML = `
            <strong>Name:</strong> ${reviewerName}<br>
            <strong>Product:</strong> ${productName}<br>
             <strong>Comment:</strong> ${feadback}<br>
            <strong>Rating:</strong> ${rating}<br>
        `;

        review.appendChild(details); // Append details to the review

        review.addEventListener('mouseenter', function() {
            details.style.display = 'block'; // Show details on hover
        });

        review.addEventListener('mouseleave', function() {
            details.style.display = 'none'; // Hide details when not hovering
        });
    });


// Theme toggle functionality
const themeToggleButton = document.getElementById('theme-toggle');
if (themeToggleButton) {
    let isDarkTheme = localStorage.getItem('darkTheme') === 'true';

    themeToggleButton.addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        document.body.classList.toggle('dark-theme', isDarkTheme);
        localStorage.setItem('darkTheme', isDarkTheme); // Save preference to localStorage
        updateCategoryHeadingColor(isDarkTheme); // Update category heading color
    });
};
