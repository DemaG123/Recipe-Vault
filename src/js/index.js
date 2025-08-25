// If using a bundler, keep this line; otherwise remove for CDN
// import "bootstrap/dist/css/bootstrap.min.css";

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("videoContainer");
  container.className = "video-container bg-secondary p-4 m-2 rounded";
  const addBtn = document.getElementById("addVideoBtn");

  // Load saved videos from localStorage
  let savedVideos = JSON.parse(localStorage.getItem("videos")) || [];

  // Function to render a video by ID
  function renderVideo(videoId) {
  const videoWrapper = document.createElement("div");
  videoWrapper.className = "video-wrapper mb-3 bg-light p-3 rounded"; // adds bottom margin

  // iframe
  const iframe = document.createElement("iframe");
  iframe.width = "560";
  iframe.height = "315";
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.frameBorder = "0";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;

  // remove button container (to center button)
  const btnContainer = document.createElement("div");
  btnContainer.className = "text-center m-2"; // center the button with margin top

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "btn btn-danger btn-lg";

  // click event
  removeBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to remove this video?")) {
      videoWrapper.remove();
      savedVideos = savedVideos.filter(id => id !== videoId);
      localStorage.setItem("videos", JSON.stringify(savedVideos));
    }
  });

  btnContainer.appendChild(removeBtn);

  videoWrapper.appendChild(iframe);
  videoWrapper.appendChild(btnContainer);

  container.appendChild(videoWrapper);
}


  // Render saved videos on page load
  savedVideos.forEach(id => renderVideo(id));

  // Add video button listener
  addBtn.addEventListener("click", () => {
    const urlInput = document.getElementById("videoUrlInput");
    const url = urlInput.value.trim();
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

    // Clear input after adding
    urlInput.value = "";

  });

});
