// Format date as Month Day, Year
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Load and display news items from the database
function displayNewsItems() {
    fetch('get_news.php')
        .then(response => response.json())
        .then(data => {
            const newsList = document.querySelector('.news-list');
            
            // Clear existing news
            newsList.innerHTML = '';
            
            if (data.length === 0) {
                newsList.innerHTML = '<div style="text-align: center; padding: 40px;"><p>No news items available.</p></div>';
                return;
            }
            
            // Display news
            data.forEach((news, index) => {
                const formattedDate = formatDate(news.date);
                
                const article = document.createElement('article');
                article.className = 'news-item';
                
                // Alternate image position
                if (index % 2 === 1) {
                    article.classList.add('reverse');
                }
                
                article.innerHTML = `
                    <div class="news-content">
                        <h3 class="news-title">${news.title}</h3>
                        <h4 class="news-subtitle">${news.subtitle}</h4>
                        <p class="news-date">${formattedDate}</p>
                        <p class="news-description">${news.description}</p>
                        <a href="#" class="read-more" onclick="showFullNews(${news.id}); return false;">Read More</a>
                    </div>
                    <div class="news-image-container">
                        <img src="${news.image_url}" alt="${news.title}" class="news-image">
                    </div>
                `;
                
                newsList.appendChild(article);
            });
        })
        .catch(error => {
            console.error('Error loading news:', error);
            document.querySelector('.news-list').innerHTML = 
                '<div style="text-align: center; padding: 40px;"><p>Error loading news. Please try again later.</p></div>';
        });
}

// Search functionality
function searchNews() {
    const searchTerm = document.getElementById('newsSearch').value.toLowerCase();
    
    if (!searchTerm.trim()) {
        // If search is empty, display all news
        displayNewsItems();
        return;
    }
    
    fetch('get_news.php')
        .then(response => response.json())
        .then(data => {
            const newsList = document.querySelector('.news-list');
            
            // Filter news by search term
            const filteredNews = data.filter(news => 
                news.title.toLowerCase().includes(searchTerm) || 
                news.subtitle.toLowerCase().includes(searchTerm) ||
                news.description.toLowerCase().includes(searchTerm)
            );
            
            // Clear existing news
            newsList.innerHTML = '';
            
            if (filteredNews.length === 0) {
                newsList.innerHTML = '<div style="text-align: center; padding: 40px;"><p>No news items found matching your search.</p></div>';
                return;
            }
            
            // Display filtered news
            filteredNews.forEach((news, index) => {
                const formattedDate = formatDate(news.date);
                
                const article = document.createElement('article');
                article.className = 'news-item';
                
                // Alternate image position
                if (index % 2 === 1) {
                    article.classList.add('reverse');
                }
                
                article.innerHTML = `
                    <div class="news-content">
                        <h3 class="news-title">${news.title}</h3>
                        <h4 class="news-subtitle">${news.subtitle}</h4>
                        <p class="news-date">${formattedDate}</p>
                        <p class="news-description">${news.description}</p>
                        <a href="#" class="read-more" onclick="showFullNews(${news.id}); return false;">Read More</a>
                    </div>
                    <div class="news-image-container">
                        <img src="${news.image_url}" alt="${news.title}" class="news-image">
                    </div>
                `;
                
                newsList.appendChild(article);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.querySelector('.news-list').innerHTML = 
                '<div style="text-align: center; padding: 40px;"><p>Error searching news. Please try again later.</p></div>';
        });
}

// Show full news item in a modal
function showFullNews(id) {
    fetch(`get_news.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            const newsItem = data.find(item => item.id == id);
            
            if (!newsItem) {
                alert('News item not found');
                return;
            }
            
            // Create modal if it doesn't exist
            let modal = document.getElementById('newsModal');
            
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'newsModal';
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <div class="modal-body"></div>
                    </div>
                `;
                document.body.appendChild(modal);
                
                // Add event listener to close button
                modal.querySelector('.close-modal').addEventListener('click', function() {
                    modal.style.display = 'none';
                });
                
                // Close modal when clicking outside
                window.addEventListener('click', function(event) {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                });
            }
            
            // Populate modal with news content
            const formattedDate = formatDate(newsItem.date);
            
            modal.querySelector('.modal-body').innerHTML = `
                <div class="full-news">
                    <div class="news-image-container">
                        <img src="${newsItem.image_url}" alt="${newsItem.title}" class="news-image">
                    </div>
                    <h2 class="news-title">${newsItem.title}</h2>
                    <h3 class="news-subtitle">${newsItem.subtitle}</h3>
                    <p class="news-date">${formattedDate}</p>
                    <div class="news-content">
                        ${newsItem.description}
                    </div>
                </div>
            `;
            
            // Display modal
            modal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error loading news item');
        });
}

// Add CSS for modal
function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.7);
        }
        
        .modal-content {
            position: relative;
            background-color: #fff;
            margin: 5% auto;
            padding: 20px;
            width: 80%;
            max-width: 800px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            animation: modalFadeIn 0.3s;
        }
        
        @keyframes modalFadeIn {
            from {opacity: 0; transform: translateY(-20px);}
            to {opacity: 1; transform: translateY(0);}
        }
        
        .close-modal {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }
        
        .close-modal:hover {
            color: #333;
        }
        
        .full-news {
            padding: 10px;
        }
        
        .full-news .news-image-container {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .full-news .news-image {
            max-width: 100%;
            max-height: 400px;
            object-fit: contain;
        }
        
        .full-news .news-title {
            color: #1a365d;
            margin-bottom: 10px;
        }
        
        .full-news .news-subtitle {
            color: #555;
            margin-bottom: 5px;
        }
        
        .full-news .news-date {
            color: #777;
            font-style: italic;
            margin-bottom: 20px;
        }
        
        .full-news .news-content {
            line-height: 1.6;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add modal styles
    addModalStyles();
    
    // Load news items
    displayNewsItems();
    
    // Set up search functionality
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', searchNews);
    }
    
    // Allow pressing Enter in search input to search
    const searchInput = document.getElementById('newsSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchNews();
            }
        });
    }
});