// Define searchable content
const searchableContent = [
    {
        title: "Home Page",
        content: "UNORSSGO Archives University of Negros Occidental-Recoletos Supreme Student Government",
        url: "../index.html"
    },
    {
        title: "Leaders Section",
        content: "UNORSSGO President Vice President Secretary Treasurer Officers Leadership Team",
        url: "../leaderspage/leaders.html"
    },
    {
        title: "Help Desk",
        content: "Educational Assistance Emergency Hotlines Student Support Services",
        url: "../helpdeskpage/helpdesk.html"
    },
    {
        title: "News and Events",
        content: "Latest announcements campus events activities student initiatives projects",
        url: "../adminpage/news.html"
    },
    {
        title: "Transparency Records",
        content: "Financial reports budget allocations expenditure reports meeting minutes",
        url: "../transparencypage/transparency.html"
    },
    // Add more searchable content as needed
];

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    let resultsContainer;
    
    // Create results container
    function createResultsContainer() {
        // Check if results container already exists
        if (document.querySelector('.search-results')) {
            return document.querySelector('.search-results');
        }
        
        // Create new results container
        const container = document.createElement('div');
        container.className = 'search-results';
        container.style.position = 'absolute';
        container.style.top = '100%';
        container.style.right = '0';
        container.style.width = '100%';
        container.style.maxHeight = '300px';
        container.style.overflowY = 'auto';
        container.style.backgroundColor = 'white';
        container.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        container.style.borderRadius = '8px';
        container.style.zIndex = '1000';
        container.style.marginTop = '10px';
        container.style.display = 'none';
        
        document.querySelector('.search-container').appendChild(container);
        return container;
    }
    
    // Perform search
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;
        
        if (!resultsContainer) {
            resultsContainer = createResultsContainer();
        }
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Filter content based on search query
        const results = searchableContent.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.content.toLowerCase().includes(query)
        );
        
        // Display results or no results message
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results" style="padding: 15px; text-align: center; color: #777;">No results found</div>';
        } else {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.style.padding = '15px';
                resultItem.style.borderBottom = '1px solid #eee';
                resultItem.style.cursor = 'pointer';
                resultItem.style.transition = 'background-color 0.2s ease';
                
                const resultTitle = document.createElement('h4');
                resultTitle.textContent = result.title;
                resultTitle.style.margin = '0 0 5px 0';
                resultTitle.style.color = '#0044cc';
                
                const resultContent = document.createElement('p');
                resultContent.textContent = result.content.substring(0, 100) + '...';
                resultContent.style.margin = '0';
                resultContent.style.fontSize = '14px';
                resultContent.style.color = '#555';
                
                resultItem.appendChild(resultTitle);
                resultItem.appendChild(resultContent);
                
                // Add hover effect
                resultItem.addEventListener('mouseover', () => {
                    resultItem.style.backgroundColor = '#f5f5f5';
                });
                resultItem.addEventListener('mouseout', () => {
                    resultItem.style.backgroundColor = 'transparent';
                });
                
                // Navigate to result page on click
                resultItem.addEventListener('click', () => {
                    window.location.href = result.url;
                });
                
                resultsContainer.appendChild(resultItem);
            });
        }
        
        // Display results container
        resultsContainer.style.display = 'block';
    }
    
    // Handle search button click
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // Handle enter key press
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Handle input focus
        searchInput.addEventListener('focus', function() {
            if (resultsContainer && searchInput.value.trim() !== '') {
                resultsContainer.style.display = 'block';
            }
        });
        
        // Hide results when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container') && resultsContainer) {
                resultsContainer.style.display = 'none';
            }
        });
    }
    
    // Add live search feature
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            if (this.value.trim().length >= 2) {
                performSearch();
            } else if (resultsContainer) {
                resultsContainer.style.display = 'none';
            }
        });
    }
});