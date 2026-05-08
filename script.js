let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = () => {
  checkSession();
  displayTasks();
};

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "" || password === "") {
    alert("Please enter username and password");
    return;
  }

  localStorage.setItem("loggedIn", "true");

  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("appBox").classList.remove("hidden");
}

function logout() {
  localStorage.removeItem("loggedIn");

  document.getElementById("loginBox").classList.remove("hidden");
  document.getElementById("appBox").classList.add("hidden");
}

function checkSession() {
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn === "true") {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("appBox").classList.remove("hidden");
  }
}

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;

  if (title === "") {
    alert("Task title is required");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    description,
    completed: false
  };

  tasks.push(task);

  saveTasks();

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";

  displayTasks();
}

function displayTasks() {
  const pendingContainer = document.getElementById("pendingTasks");
  const completedContainer = document.getElementById("completedTasks");

  pendingContainer.innerHTML = "";
  completedContainer.innerHTML = "";

  tasks.forEach(task => {
    const taskCard = document.createElement("div");
    taskCard.className = task.completed ? "task-card completed" : "task-card";

    taskCard.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.description}</p>

      <div class="task-buttons">
        <button class="complete-btn" onclick="toggleTask(${task.id})">
          ${task.completed ? "Mark Pending" : "Complete"}
        </button>

        <button class="edit-btn" onclick="editTask(${task.id})">
          Edit
        </button>

        <button class="delete-btn" onclick="deleteTask(${task.id})">
          Delete
        </button>
      </div>
    `;

    if (task.completed) {
      completedContainer.appendChild(taskCard);
    } else {
      pendingContainer.appendChild(taskCard);
    }
  });
}

function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  saveTasks();
  displayTasks();
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);

  const newTitle = prompt("Edit Task Title", task.title);
  const newDescription = prompt("Edit Description", task.description);

  if (newTitle !== null && newTitle !== "") {
    task.title = newTitle;
    task.description = newDescription;

    saveTasks();
    displayTasks();
  }
}

function deleteTask(id) {
  const confirmDelete = confirm("Delete this task?");

  if (confirmDelete) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
