// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Set active link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Video storage functionality
const videoUrlInput = document.getElementById('videoUrl');
const addVideoBtn = document.getElementById('addVideoBtn');
const videosContainer = document.getElementById('videosContainer');
const emptyState = document.getElementById('emptyState');
const notification = document.getElementById('notification');

// Function to get videos from localStorage
function getVideos() {
    const videos = localStorage.getItem('recipeVaultVideos');
    return videos ? JSON.parse(videos) : [];
}

// Function to save videos to localStorage
function saveVideos(videos) {
    localStorage.setItem('recipeVaultVideos', JSON.stringify(videos));
}

// Function to convert URL to embed URL
function getEmbedUrl(url) {
    // YouTube
    if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1].split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }
    // YouTube short link
    else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }
    // Vimeo
    else if (url.includes('vimeo.com/')) {
        const videoId = url.split('vimeo.com/')[1].split('?')[0];
        return `https://player.vimeo.com/video/${videoId}`;
    }
    // Return original URL if not recognized
    return url;
}

// Function to create a video card
function createVideoCard(video) {
    const embedUrl = getEmbedUrl(video.url);
    const isEmbeddable = embedUrl !== video.url;
    
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.dataset.id = video.id;
    
    videoCard.innerHTML = `
        <div class="video-header">
            <h3 class="video-title">Embedded Video</h3>
            <span class="video-date">added ${video.dateAdded}</span>
        </div>
        <div class="video-embed">
            ${isEmbeddable ? 
                `<iframe src="${embedUrl}" allowfullscreen></iframe>` : 
                `<div class="video-placeholder">
                    <i class="fas fa-play-circle fa-3x"></i>
                </div>`
            }
        </div>
        <div class="video-actions">
            <button class="action-btn">
                <i class="fas fa-eye"></i>
                Show Note
            </button>
            <button class="action-btn">
                <i class="fas fa-plus"></i>
                Add Note
            </button>
            <button class="action-btn">
                <i class="fas fa-tag"></i>
                Add tag
            </button>
            <button class="action-btn delete" data-id="${video.id}">
                <i class="fas fa-trash"></i>
                delete
            </button>
        </div>
        <div class="video-tags">
            <span class="tag">tags</span>
            <span class="tag">cooking</span>
            <span class="tag">tutorial</span>
        </div>
    `;
    
    return videoCard;
}

// Function to display videos
function displayVideos() {
    const videos = getVideos();
    videosContainer.innerHTML = '';
    
    if (videos.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // Display videos in reverse order (newest first)
    videos.reverse().forEach(video => {
        const videoCard = createVideoCard(video);
        videosContainer.appendChild(videoCard);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', deleteVideo);
    });
}

// Function to add a new video
function addVideo() {
    const url = videoUrlInput.value.trim();
    
    if (!url) {
        showNotification('Please enter a video URL');
        return;
    }
    
    const videos = getVideos();
    const newVideo = {
        id: Date.now(),
        url: url,
        dateAdded: new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
    };
    
    videos.push(newVideo);
    saveVideos(videos);
    
    // Clear input
    videoUrlInput.value = '';
    
    // Show notification
    showNotification('Video added successfully!');
    
    // Refresh display
    displayVideos();
}

// Function to delete a video
function deleteVideo(e) {
    const videoId = parseInt(e.currentTarget.dataset.id);
    const videos = getVideos();
    
    const updatedVideos = videos.filter(video => video.id !== videoId);
    saveVideos(updatedVideos);
    
    showNotification('Video deleted successfully!');
    displayVideos();
}

// Function to show notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Event listeners
addVideoBtn.addEventListener('click', addVideo);
videoUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addVideo();
    }
});

// Initialize display
displayVideos();

// Video action buttons (except delete)
document.addEventListener('click', (e) => {
    if (e.target.closest('.action-btn') && !e.target.closest('.action-btn.delete')) {
        const action = e.target.closest('.action-btn').textContent.trim();
        showNotification(`${action} functionality would go here`);
    }
});

// Search functionality
document.querySelector('.search-input').addEventListener('input', (e) => {
    console.log('Searching for:', e.target.value);
    // In a real app, this would filter the videos
});

// Filter functionality
document.querySelectorAll('.filter-option input').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        console.log('Filter changed:', e.target.id, e.target.checked);
        // In a real app, this would apply filters
    });
});

// Sort functionality
document.querySelector('.sort-select').addEventListener('change', (e) => {
    console.log('Sort changed to:', e.target.value);
    // In a real app, this would sort the videos
});