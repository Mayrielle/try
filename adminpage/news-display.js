// Function to load and display news items from localStorage
function displayNewsItems() {
    const newsList = document.querySelector('.news-list');
    if (!newsList) return;
    
    // Clear existing news items
    newsList.innerHTML = '';
    
    // Get news items from localStorage
    const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
    
    // Limit to maximum 4 news items and sort by date (newest first)
    const sortedNews = newsItems
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);
    
    // Add each news item to the list
    sortedNews.forEach((news, index) => {
        const formattedDate = formatDate(news.date);
        
        const article = document.createElement('article');
        article.className = 'news-item';
        
        // Alternate image position (even items have image on right)
        if (index % 2 === 1) {
            article.classList.add('reverse');
        }
        
        article.innerHTML = `
            <div class="news-content">
                <h3 class="news-title">${news.title}</h3>
                <h4 class="news-subtitle">${news.subtitle}</h4>
                <p class="news-date">${formattedDate}</p>
                <p class="news-description">${news.description}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
            <div class="news-image-container">
                <img src="${news.image}" alt="${news.title}" class="news-image">
            </div>
        `;
        
        newsList.appendChild(article);
    });
}

// Format date to display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    displayNewsItems();
});