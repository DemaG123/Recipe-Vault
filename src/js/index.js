document.getElementById("addVideoBtn").addEventListener("click", () => {
  // Ask user for YouTube URL
  const url = prompt("Paste the YouTube video URL:");

  if (url) {
    let videoId = "";

    // Case 1: standard YouTube URL (https://www.youtube.com/watch?v=XXXX)
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }
    // Case 2: short YouTube URL (https://youtu.be/XXXX)
    else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }

    if (videoId) {
      // Create iframe
      const iframe = document.createElement("iframe");
      iframe.width = "560" / 1.5;
      iframe.height = "315" / 1.5;
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.frameBorder = "0";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;

      // Add iframe to container
      document.getElementById("videoContainer").appendChild(iframe);
      document.getElementById("videoContainer").style.backgroundColor = "lightgray";
      document.getElementById("videoContainer").style.padding = "20px";
      document.getElementById("videoContainer").style.borderRadius = "10px";

    } else {
      alert("Invalid YouTube URL");
    }
  }
});
