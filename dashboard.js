const BASE = "http://localhost:8080/api/lessons";

let role = "user";
let completedLessons = JSON.parse(localStorage.getItem("completed")) || [];
let projects = JSON.parse(localStorage.getItem("projects")) || [];

// INIT
window.onload = () => {
  setRole();
};

// ROLE CONTROL
function setRole() {
  role = document.getElementById("roleSelect").value;
  renderUI();
}

// NAVIGATION
function showSection(id) {
  document.querySelectorAll("main section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// LOGOUT
function logout() {
  window.location.href = "index.html";
}

// LOAD LESSONS
async function loadLessons() {
  const res = await fetch(BASE);
  const data = await res.json();

  const container = document.getElementById("lessonContainer");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No lessons available</p>";
    updateProgress(0);
    return;
  }

  data.forEach(l => {
    const isCompleted = completedLessons.includes(l.id);

    container.innerHTML += `
      <div class="card">
        <h3>${l.name}</h3>
        <p>Marks: ${l.marks}</p>

        <!-- FIXED VIEW BUTTON -->
        <button onclick="viewLesson(${JSON.stringify(l.content || "No content")})">
          📖 View
        </button>

        ${
          role === "admin"
            ? `
          <button onclick="editLesson(${l.id}, ${JSON.stringify(l.name)}, ${l.marks}, ${JSON.stringify(l.content || "")})">
            ✏️ Edit
          </button>
          <button onclick="deleteLesson(${l.id})">
            🗑 Delete
          </button>
        `
            : `
          <button onclick="toggleComplete(${l.id})">
            ${isCompleted ? "❌ Undo" : "✅ Complete"}
          </button>
        `
        }
      </div>
    `;
  });

  updateProgress(data.length);
}

// VIEW LESSON (IMPROVED)
function viewLesson(content) {
  const win = window.open("", "_blank");
  win.document.write(`
    <html>
    <head>
      <title>Lesson</title>
      <style>
        body { font-family: Arial; padding: 20px; }
        h2 { color: green; }
      </style>
    </head>
    <body>
      <h2>Lesson Content</h2>
      <p>${content}</p>
    </body>
    </html>
  `);
}

// ADD LESSON (ADMIN ONLY)
async function addLesson() {
  if (role !== "admin") {
    alert("Admin only");
    return;
  }

  const name = document.getElementById("name").value;
  const marks = document.getElementById("marks").value;
  const content = document.getElementById("content").value;

  if (!name || !marks || !content) {
    alert("Fill all fields");
    return;
  }

  await fetch(BASE, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name,
      marks: parseInt(marks),
      content
    })
  });

  document.getElementById("name").value = "";
  document.getElementById("marks").value = "";
  document.getElementById("content").value = "";

  loadLessons();
}

// DELETE LESSON
async function deleteLesson(id) {
  await fetch(`${BASE}/${id}`, { method: "DELETE" });

  completedLessons = completedLessons.filter(x => x !== id);
  localStorage.setItem("completed", JSON.stringify(completedLessons));

  loadLessons();
}

// EDIT LESSON (FIXED)
async function editLesson(id, name, marks, content) {
  const newName = prompt("Edit Name:", name);
  const newMarks = prompt("Edit Marks:", marks);
  const newContent = prompt("Edit Content:", content);

  if (!newName || !newMarks || !newContent) return;

  await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: newName,
      marks: parseInt(newMarks),
      content: newContent
    })
  });

  loadLessons();
}

// COMPLETE / UNDO
function toggleComplete(id) {
  if (completedLessons.includes(id)) {
    completedLessons = completedLessons.filter(x => x !== id);
  } else {
    completedLessons.push(id);
  }

  localStorage.setItem("completed", JSON.stringify(completedLessons));
  loadLessons();
}

// PROJECTS
function addProject() {
  const name = document.getElementById("projectName").value;
  if (!name) return;

  projects.push(name);
  localStorage.setItem("projects", JSON.stringify(projects));

  document.getElementById("projectName").value = "";
  loadProjects();
}

function loadProjects() {
  const container = document.getElementById("projectContainer");
  container.innerHTML = "";

  projects.forEach((p, i) => {
    container.innerHTML += `
      <div class="card">
        ${p}
        ${
          role === "admin"
            ? `<button onclick="deleteProject(${i})">Delete</button>`
            : ""
        }
      </div>
    `;
  });
}

function deleteProject(i) {
  projects.splice(i, 1);
  localStorage.setItem("projects", JSON.stringify(projects));
  loadProjects();
}

// PROGRESS
function updateProgress(totalLessons) {
  const completed = completedLessons.length;

  const percent =
    totalLessons === 0 ? 0 : (completed / totalLessons) * 100;

  document.getElementById("progressText").innerText =
    `Completed: ${completed} / ${totalLessons}`;

  document.getElementById("progressFill").style.width = percent + "%";
}

// RENDER UI
function renderUI() {
  document.getElementById("adminControls").style.display =
    role === "admin" ? "block" : "none";

  loadLessons();
  loadProjects();
}