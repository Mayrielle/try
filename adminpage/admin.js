// Initialize news items in localStorage if not exists
if (!localStorage.getItem('newsItems')) {
    // Sample initial news items
    const initialNews = [
        {
            id: '1',
            title: 'Annual Conference Announced',
            subtitle: 'Join Us For This Year\'s Event',
            date: '2025-04-20',
            description: 'Join us for our annual conference discussing the latest developments and initiatives in our organization. This year\'s event will feature keynote speakers, interactive workshops, and valuable networking opportunities. Don\'t miss this chance to connect with industry leaders and learn about the future of our field.',
            image: '/api/placeholder/400/320'
        },
        {
            id: '2',
            title: 'New Partnership Formed',
            subtitle: 'Expanding Our Global Reach',
            date: '2025-04-15',
            description: 'We\'re excited to announce our new strategic partnership to expand our global initiatives. This collaboration will enable us to reach more communities and make a greater impact on our shared mission. Together with our new partners, we\'ll be launching innovative programs designed to address critical challenges.',
            image: '/api/placeholder/400/320'
        },
        {
            id: '3',
            title: 'Community Outreach Program',
            subtitle: 'Making a Difference Locally',
            date: '2025-04-10',
            description: 'Learn about our latest community outreach program and how you can get involved. This initiative aims to support local communities through education, resources, and volunteer opportunities. By working together, we can create positive change and build stronger, more resilient neighborhoods.',
            image: '/api/placeholder/400/320'
        },
        {
            id: '4',
            title: 'Scholarship Program Opens',
            subtitle: 'Supporting Future Leaders',
            date: '2025-04-05',
            description: 'Applications are now open for our annual scholarship program. We\'re committed to supporting the next generation of leaders by providing financial assistance for educational pursuits. This year, we\'ve expanded the program to include more fields of study and increased the number of available scholarships.',
            image: '/api/placeholder/400/320'
        }
    ];
    
    localStorage.setItem('newsItems', JSON.stringify(initialNews));
}

// DOM Elements
const newsForm = document.getElementById('newsForm');
const newsTableBody = document.getElementById('newsTableBody');
const formTitle = document.getElementById('formTitle');

// Load all news items
function loadNewsItems() {
    const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
    
    // Clear the table
    newsTableBody.innerHTML = '';
    
    if (newsItems.length === 0) {
        newsTableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No news items found</td></tr>';
        return;
    }
    
    // Add news items to the table
    newsItems.forEach(news => {
        const formattedDate = formatDate(news.date);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${news.title}</td>
            <td>${formattedDate}</td>
            <td class="action-buttons">
                <button class="action-btn edit-btn" onclick="editNews('${news.id}')">
                    <i class="fa fa-pencil"></i> Edit
                </button>
                <button class="action-btn delete-btn" onclick="deleteNews('${news.id}')">
                    <i class="fa fa-trash"></i> Delete
                </button>
            </td>
        `;
        
        newsTableBody.appendChild(row);
    });
}

// Format date to display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Add new news or update existing
function saveNews(event) {
    event.preventDefault();
    
    const newsId = document.getElementById('newsId').value;
    const title = document.getElementById('newsTitle').value;
    const subtitle = document.getElementById('newsSubtitle').value;
    const date = document.getElementById('newsDate').value;
    const description = document.getElementById('newsDescription').value;
    const image = document.getElementById('newsImage').value;
    
    const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
    
    if (newsId) {
        // Update existing news
        const index = newsItems.findIndex(item => item.id === newsId);
        if (index !== -1) {
            newsItems[index] = {
                id: newsId,
                title,
                subtitle,
                date,
                description,
                image
            };
        }
    } else {
        // Add new news
        const newNews = {
            id: Date.now().toString(),
            title,
            subtitle,
            date,
            description,
            image
        };
        
        newsItems.push(newNews);
    }
    
    // Save to localStorage
    localStorage.setItem('newsItems', JSON.stringify(newsItems));
    
    // Show success message
    showAlert('News saved successfully!', 'success');
    
    // Reset form and reload news list
    clearForm();
    loadNewsItems();
    
    // Switch to news list tab
    openTab('newsList');
}

// Edit news item
function editNews(id) {
    const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
    const news = newsItems.find(item => item.id === id);
    
    if (news) {
        document.getElementById('newsId').value = news.id;
        document.getElementById('newsTitle').value = news.title;
        document.getElementById('newsSubtitle').value = news.subtitle;
        document.getElementById('newsDate').value = news.date;
        document.getElementById('newsDescription').value = news.description;
        document.getElementById('newsImage').value = news.image;
        
        formTitle.textContent = 'Edit News Item';
        
        // Switch to add/edit form tab
        openTab('addNews');
    }
}

// Delete news item
function deleteNews(id) {
    if (confirm('Are you sure you want to delete this news item?')) {
        const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
        const updatedNews = newsItems.filter(item => item.id !== id);
        
        localStorage.setItem('newsItems', JSON.stringify(updatedNews));
        
        // Show success message
        showAlert('News item deleted successfully!', 'danger');
        
        // Reload news list
        loadNewsItems();
    }
}

// Clear form inputs
function clearForm() {
    document.getElementById('newsId').value = '';
    document.getElementById('newsTitle').value = '';
    document.getElementById('newsSubtitle').value = '';
    document.getElementById('newsDate').value = '';
    document.getElementById('newsDescription').value = '';
    document.getElementById('newsImage').value = '';
    
    formTitle.textContent = 'Add New News Item';
}

// Open tab content
function openTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    // Hide all tab contents
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Deactivate all tab buttons
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show the selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Activate the clicked tab button
    const activeButton = document.querySelector(`.tab-btn[onclick="openTab('${tabName}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Show alert message
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        ${message}
        <button class="alert-close" onclick="this.parentElement.remove();">&times;</button>
    `;
    
    // Add to the top of the admin container
    const adminContainer = document.querySelector('.admin-container');
    adminContainer.insertBefore(alertDiv, adminContainer.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.remove();
        }
    }, 5000);
}

// Mock logout function
function logout() {
    alert('In a real application, this would log you out.');
    // In a real app, you would clear session/auth token and redirect to login page
}

// Event Listeners
if (newsForm) {
    newsForm.addEventListener('submit', saveNews);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load news items into table
    if (newsTableBody) {
        loadNewsItems();
    }
});