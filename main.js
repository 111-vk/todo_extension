console.log("Main script is running...");
// elements for new tab 
const Main_container = document.getElementById("main-container");
create_priorty_contaner();

Object.assign(Main_container.style, {
  width: "100%",
  height: "100%",
  display: "flex",
  backgroundImage: "url('/images/bg.png')", // Corrected property name
  backgroundSize: "cover", // Ensure the image covers the container
  backgroundPosition: "center" // Center the image
});


function create_priorty_contaner() {
  for (let i = 0; i < 3; i++) {
    const priority_div = document.createElement("div");
    priority_div.id = `priority-${i + 1}`;
    priority_div.classList.add("priority_div");
    Object.assign(priority_div.style, {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "center",
      // alignItems: "center",
      border: "2px solid black",
      background: "rgba(255, 255, 255, 0.3)"
    })
    Main_container.appendChild(priority_div);
  }
  const priority1 = document.getElementById("priority-1");
  const priority2 = document.getElementById("priority-2");
  const priority3 = document.getElementById("priority-3");
  // Object.assign(priority1.style, {
  //   backgroundColor: "rgba(255, 0, 0, 0.8)", // Red for high priority
  // });
  // Object.assign(priority2.style, {
  //   backgroundColor: "rgba(255, 165, 0, 0.8)", // Orange for medium priority
  // });
  // Object.assign(priority3.style, {
  //   backgroundColor: "rgba(0, 255, 0, 0.8)", // Green for low priority
  // });
  renderTasks();
}


function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // console.log("Rendering tasks:", tasks);

  // Clear existing tasks in priority containers
  document.getElementById("priority-1").innerHTML = "";
  document.getElementById("priority-2").innerHTML = "";
  document.getElementById("priority-3").innerHTML = "";

  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    Object.assign(taskDiv.style, {
      width: "95%",
      margin: "10px 0",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      background: "#f9f9f9",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
      fontSize: "0.9rem",
      color: "#333"
    });

    // Add task details
    taskDiv.innerHTML = `
      <h3 style="margin: 4px 0;">Task name: ${task.task_name || "No ID"}</h3>
      <strong>Priority:</strong> ${task.task_priority || "Not set"}<br>
      <strong>Deadline:</strong> ${task.task_deadline || "No deadline"}<br>
      <strong>Time:</strong> ${task.task_time || "No time"} <br>
      <strong>Description:</strong> ${task.task_description || "No description"}<br>
    `;

    if (task.task_priority === "high") {
      const priorityContainer = document.getElementById("priority-1");
      priorityContainer.appendChild(taskDiv);
    } else if (task.task_priority === "medium") {
      const priorityContainer = document.getElementById("priority-2");
      priorityContainer.appendChild(taskDiv);
    } else if (task.task_priority === "low") {
      const priorityContainer = document.getElementById("priority-3");
      priorityContainer.appendChild(taskDiv);
    }
  });
}