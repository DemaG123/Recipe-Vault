const container = document.getElementById("videoContainer");
const addBtn = document.getElementById("addVideoBtn");

// Load saved videos from localStorage
let savedVideos = JSON.parse(localStorage.getItem("videos")) || [];

// Function to render a video by ID
function renderVideo(videoId) {
  const videoWrapper = document.createElement("div");
  videoWrapper.className = "video-wrapper";

  const iframe = document.createElement("iframe");
  iframe.width = "560";
  iframe.height = "315";
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.frameBorder = "0";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("btnRemove");

  removeBtn.addEventListener("click", () => {
    videoWrapper.remove();
    savedVideos = savedVideos.filter(id => id !== videoId);
    localStorage.setItem("videos", JSON.stringify(savedVideos));
  });

  videoWrapper.appendChild(iframe);
  videoWrapper.appendChild(removeBtn);
  container.appendChild(videoWrapper);
}

// Render saved videos on page load
savedVideos.forEach(id => renderVideo(id));

// Add video button listener
addBtn.addEventListener("click", () => {
  const url = prompt("Paste the YouTube video URL:");
  if (!url) return;

  let videoId = "";
  if (url.includes("watch?v=")) {
    videoId = url.split("watch?v=")[1].split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  }

  if (!videoId) {
    alert("Invalid YouTube URL");
    return;
  }

  savedVideos.push(videoId);
  localStorage.setItem("videos", JSON.stringify(savedVideos));
  renderVideo(videoId);
});
