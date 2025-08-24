document.getElementById("addVideoBtn").addEventListener("click", () => {
  const url = prompt("Paste the YouTube video URL:");

  if (url) {
    let videoId = "";

    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }

    if (videoId) {
      // Create a wrapper div for the iframe + remove button
      const videoWrapper = document.createElement("div");
      videoWrapper.style.position = "relative"; // optional for styling
      videoWrapper.style.marginBottom = "20px";
      videoWrapper.className = "video-wrapper"; // optional for styling

      // Create iframe
      const iframe = document.createElement("iframe");
      iframe.width = "560";
      iframe.height = "315";
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.frameBorder = "0";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;

      // Create remove button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("btnRemove");
      removeBtn.style.display = "block";
      removeBtn.style.marginTop = "5px";

      // Remove event
      removeBtn.addEventListener("click", () => {
        videoWrapper.remove(); // removes the entire video + button
      });

      // Append iframe and button to wrapper
      videoWrapper.appendChild(iframe);
      videoWrapper.appendChild(removeBtn);

      // Add wrapper to container
      document.getElementById("videoContainer").appendChild(videoWrapper);
    } else {
      alert("Invalid YouTube URL");
    }
  }
});
