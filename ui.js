// script.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("blogForm");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const entryList = document.getElementById("entryList");

  // Load saved entries from localStorage
  const loadEntries = () => {
    entryList.innerHTML = "";
    const entries = JSON.parse(localStorage.getItem("blogEntries")) || [];

    if (entries.length === 0) {
      entryList.innerHTML = "<p style='text-align:center;'>No entries yet. Start writing!</p>";
    }

    entries.reverse().forEach((entry) => {
      const entryDiv = document.createElement("div");
      entryDiv.className = "entry";

      const entryTitle = document.createElement("h3");
      entryTitle.textContent = entry.title;

      const entryContent = document.createElement("p");
      entryContent.textContent = entry.content;

      const entryDate = document.createElement("small");
      entryDate.style.display = "block";
      entryDate.style.color = "#888";
      entryDate.style.marginTop = "5px";
      entryDate.textContent = `Posted on: ${entry.date}`;

      entryDiv.appendChild(entryTitle);
      entryDiv.appendChild(entryContent);
      entryDiv.appendChild(entryDate);

      entryList.appendChild(entryDiv);
    });
  };

  // Save new entry to localStorage
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const date = new Date().toLocaleString();

    if (title && content) {
      const newEntry = { title, content, date };
      const entries = JSON.parse(localStorage.getItem("blogEntries")) || [];
      entries.push(newEntry);
      localStorage.setItem("blogEntries", JSON.stringify(entries));

      titleInput.value = "";
      contentInput.value = "";
      loadEntries();
    }
  });

  loadEntries(); // Initial load
});
