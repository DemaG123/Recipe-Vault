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

// Add video button functionality
const videoUrlInput = document.getElementById('videoUrl');
const addVideoBtn = document.getElementById('addVideoBtn');

addVideoBtn.addEventListener('click', () => {
    const url = videoUrlInput.value;
    if (url.trim()) {
        alert(`Video URL added: ${url}`);
        videoUrlInput.value = ''; // Clear input after adding
    } else {
        alert('Please enter a video URL');
    }
});

// Allow pressing Enter to add video
videoUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addVideoBtn.click();
    }
});