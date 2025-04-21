document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    // Load dashboard data
    loadDashboardData();
    loadRecentNews();
});

// Load dashboard summary data
function loadDashboardData() {
    const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
    
    // Total news count
    const totalNewsElement = document.getElementById('totalNewsCount');
    if (totalNewsElement) {
        totalNewsElement.textContent = newsItems.length;
    }
    
    // Recent news (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentNews = newsItems.filter(item => {
        const newsDate = new Date(item.date);
        return newsDate >= thirtyDaysAgo;
    });
    
    const recentNewsElement = document.getElementById('recentNewsCount');
    if (recentNewsElement) {
        recentNewsElement.textContent = recentNews.length;
    }
    
    // Active news (showing on the site - limited to 4)
    const activeNewsElement = document.getElementById('activeNewsCount');
    if (activeNewsElement) {
        activeNewsElement.textContent = Math.min(newsItems.length, 4);
    }
}

// Load recent news items for the dashboard table
function loadRecentNews() {
    const dashboardNewsTable = document.getElementById('dashboardNewsTable');
    if (!dashboardNewsTable) return;
    
    const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
    
    // Sort by date (newest first) and take latest 5
    const recentNews = [...newsItems]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    // Clear the table
    dashboardNewsTable.innerHTML = '';
    
    if (recentNews.length === 0) {
        dashboardNewsTable.innerHTML = '<tr><td colspan="3" style="text-align: center;">No news items found</td></tr>';
        return;
    }
    
    // Add news items to the table
    recentNews.forEach(news => {
        const formattedDate = formatDate(news.date);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${news.title}</td>
            <td>${formattedDate}</td>
            <td class="action-buttons">
                <a href="admin-news.html" onclick="localStorage.setItem('editNewsId', '${news.id}')" class="action-btn edit-btn">
                    <i class="fa fa-pencil"></i> Edit
                </a>
                <button class="action-btn delete-btn" onclick="deleteNewsDashboard('${news.id}')">
                    <i class="fa fa-trash"></i> Delete
                </button>
            </td>
        `;
        
        dashboardNewsTable.appendChild(row);
    });
}

// Delete news from dashboard
function deleteNewsDashboard(id) {
    if (confirm('Are you sure you want to delete this news item?')) {
        const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
        const updatedNews = newsItems.filter(item => item.id !== id);
        
        localStorage.setItem('newsItems', JSON.stringify(updatedNews));
        
        // Show success message (could implement a flash message here)
        
        // Reload dashboard data
        loadDashboardData();
        loadRecentNews();
    }
}

// Format date to display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}