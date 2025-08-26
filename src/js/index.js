document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("videoContainer");
  container.className = "video-container bg-secondary p-4 m-2 rounded";
  const addBtn = document.getElementById("addVideoBtn");

  // Load saved videos and notes from localStorage
  let savedVideos = JSON.parse(localStorage.getItem("videos")) || [];

  function renderVideo(videoId, note = "") {
    const videoWrapper = document.createElement("div");
    videoWrapper.className = "video-wrapper mb-3 bg-light p-3 rounded";

    // iframe
    const iframe = document.createElement("iframe");
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    // Buttons container
    const btnContainer = document.createElement("div");
    btnContainer.className = "text-center m-2 d-flex justify-content-center gap-2";

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "btn btn-danger btn-lg";
    removeBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to remove this video?")) {
        videoWrapper.remove();
        savedVideos = savedVideos.filter(v => v.id !== videoId);
        localStorage.setItem("videos", JSON.stringify(savedVideos));
      }
    });

    // Add Note button
    const noteBtn = document.createElement("button");
    noteBtn.textContent = "Add Note";
    noteBtn.className = "btn btn-info btn-lg";
    noteBtn.setAttribute("data-bs-toggle", "collapse");
    noteBtn.setAttribute("data-bs-target", `#note-${videoId}`);
    noteBtn.setAttribute("aria-expanded", "false");
    noteBtn.setAttribute("aria-controls", `note-${videoId}`);

    // Collapsible note area
    const noteWrapper = document.createElement("div");
    noteWrapper.className = "collapse mt-2";
    noteWrapper.id = `note-${videoId}`;

    const noteTextarea = document.createElement("textarea");
    noteTextarea.className = "form-control mb-2";
    noteTextarea.placeholder = "Write your note here...";
    noteTextarea.value = note;

    const saveNoteBtn = document.createElement("button");
    saveNoteBtn.className = "btn btn-success btn-sm mb-2";
    saveNoteBtn.textContent = "Save Note";

    // Display saved note
    const noteDisplay = document.createElement("p");
    noteDisplay.className = "mt-2";
    noteDisplay.textContent = note;

    // Save note event
    saveNoteBtn.addEventListener("click", () => {
      noteDisplay.textContent = noteTextarea.value;

      // Update localStorage
      savedVideos = savedVideos.map(v => {
        if (v.id === videoId) return { id: videoId, note: noteTextarea.value };
        return v;
      });
      localStorage.setItem("videos", JSON.stringify(savedVideos));

      // Collapse panel after save
      const collapseInstance = bootstrap.Collapse.getInstance(noteWrapper);
      if (collapseInstance) collapseInstance.hide();
    });

    noteWrapper.appendChild(noteTextarea);
    noteWrapper.appendChild(saveNoteBtn);
    noteWrapper.appendChild(noteDisplay);

    // Append buttons
    btnContainer.appendChild(removeBtn);
    btnContainer.appendChild(noteBtn);

    // Build wrapper
    videoWrapper.appendChild(iframe);
    videoWrapper.appendChild(btnContainer);
    videoWrapper.appendChild(noteWrapper);

    container.appendChild(videoWrapper);
  }

  // Render saved videos on page load
  savedVideos.forEach(v => renderVideo(v.id, v.note));

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

    const newVideo = { id: videoId, note: "" };
    savedVideos.push(newVideo);
    localStorage.setItem("videos", JSON.stringify(savedVideos));
    renderVideo(videoId);

    urlInput.value = "";
  });
});
