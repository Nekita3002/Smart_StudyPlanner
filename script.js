let taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
window.onload = () => {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTaskToUI(task));
};

// Add Task
function addTask() {
  let subject = document.getElementById("subject").value;
  let topic = document.getElementById("topic").value;
  let deadline = document.getElementById("deadline").value;

  if (!subject || !topic || !deadline) {
    alert("Please fill all fields!");
    return;
  }

  let task = { subject, topic, deadline, completed: false };

  // Save to local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  addTaskToUI(task);

  // Clear input
  document.getElementById("subject").value = "";
  document.getElementById("topic").value = "";
  document.getElementById("deadline").value = "";
}

// Add task to UI
function addTaskToUI(task) {
  let li = document.createElement("li");
  li.innerHTML = `
    <span>${task.subject} - ${task.topic} (📅 ${task.deadline})</span>
    <div>
      <button onclick="toggleComplete(this)">✔</button>
      <button onclick="deleteTask(this)">❌</button>
    </div>
  `;
  if (task.completed) li.classList.add("completed");
  taskList.appendChild(li);
}

// Toggle task completion
function toggleComplete(button) {
  let li = button.closest("li");
  li.classList.toggle("completed");
  updateLocalStorage();
}

// Delete task
function deleteTask(button) {
  let li = button.closest("li");
  li.remove();
  updateLocalStorage();
}

// Update local storage
function updateLocalStorage() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    let text = li.querySelector("span").textContent;
    let [subjectTopic, deadlinePart] = text.split("(📅 ");
    let [subject, topic] = subjectTopic.split(" - ");
    let deadline = deadlinePart.replace(")", "").trim();
    tasks.push({
      subject: subject.trim(),
      topic: topic.trim(),
      deadline: deadline,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
