// Check if user is logged in via AJAX
function checkAuth() {
    fetch('auth_check.php')
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        })
        .catch(error => {
            console.error('Auth check error:', error);
        });
}

// Load news items for admin dashboard
function loadNewsItems() {
    fetch('get_news.php')
        .then(response => response.json())
        .then(data => {
            const newsTableBody = document.getElementById('newsTableBody');
            const dashboardNewsTable = document.getElementById('dashboardNewsTable');
            
            // Update dashboard counts
            if (document.getElementById('totalNewsCount')) {
                document.getElementById('totalNewsCount').textContent = data.length;
                
                // Calculate recent news (last 7 days)
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                
                const recentNews = data.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate >= oneWeekAgo;
                });
                
                document.getElementById('recentNewsCount').textContent = recentNews.length;
                document.getElementById('activeNewsCount').textContent = data.filter(item => item.active == 1).length;
            }
            
            // Populate tables if they exist
            if (newsTableBody) {
                newsTableBody.innerHTML = '';
                
                data.forEach(item => {
                    const formattedDate = new Date(item.date).toLocaleDateString();
                    
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.title}</td>
                        <td>${formattedDate}</td>
                        <td>
                            <button class="action-btn edit-btn" onclick="editNewsItem(${item.id})">
                                <i class="fa fa-edit"></i> Edit
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteNewsItem(${item.id})">
                                <i class="fa fa-trash"></i> Delete
                            </button>
                        </td>
                    `;
                    
                    newsTableBody.appendChild(row);
                });
            }
            
            // Populate dashboard table if it exists
            if (dashboardNewsTable) {
                dashboardNewsTable.innerHTML = '';
                
                // Show only 5 most recent news items
                const recentItems = data.slice(0, 5);
                
                recentItems.forEach(item => {
                    const formattedDate = new Date(item.date).toLocaleDateString();
                    
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.title}</td>
                        <td>${formattedDate}</td>
                        <td>
                            <button class="action-btn edit-btn" onclick="editNewsItem(${item.id})">
                                <i class="fa fa-edit"></i> Edit
                            </button>
                        </td>
                    `;
                    
                    dashboardNewsTable.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error('Error loading news:', error);
        });
}

// Delete a news item
function deleteNewsItem(id) {
    if (confirm('Are you sure you want to delete this news item?')) {
        fetch(`delete_news.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Reload the news items
                    loadNewsItems();
                } else {
                    alert('Error deleting news item');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

// Edit a news item
function editNewsItem(id) {
    // Fetch the specific news item
    fetch(`get_news.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            const newsItem = data.find(item => item.id == id);
            if (newsItem) {
                // Switch to Add News tab
                openTab('addNews');
                
                // Populate the form
                document.getElementById('newsId').value = newsItem.id;
                document.getElementById('newsTitle').value = newsItem.title;
                document.getElementById('newsSubtitle').value = newsItem.subtitle;
                document.getElementById('newsDate').value = newsItem.date;
                document.getElementById('newsDescription').value = newsItem.description;
                document.getElementById('newsImage').value = newsItem.image_url;
                
                // Update form title
                document.getElementById('formTitle').textContent = 'Edit News Item';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Clear the form
function clearForm() {
    document.getElementById('newsForm').reset();
    document.getElementById('newsId').value = '';
    document.getElementById('formTitle').textContent = 'Add New News Item';
}

// Open a tab
function openTab(tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Deactivate all tab buttons
    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Show the selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Activate the clicked tab button
    const activeButton = document.querySelector(`.tab-btn[onclick="openTab('${tabName}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Submit the news form
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Load news items
    loadNewsItems();
    
    // Set up form submission
    const newsForm = document.getElementById('newsForm');
    if (newsForm) {
        newsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData();
            formData.append('id', document.getElementById('newsId').value);
            formData.append('title', document.getElementById('newsTitle').value);
            formData.append('subtitle', document.getElementById('newsSubtitle').value);
            formData.append('date', document.getElementById('newsDate').value);
            formData.append('description', document.getElementById('newsDescription').value);
            formData.append('image_url', document.getElementById('newsImage').value);
            
            fetch('add_news.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    // Clear the form
                    clearForm();
                    
                    // Switch to News List tab
                    openTab('newsList');
                    
                    // Reload the news items
                    loadNewsItems();
                } else {
                    alert('Error saving news item');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});

// Logout function
function logout() {
    window.location.href = 'logout.php';
}