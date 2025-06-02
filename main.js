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
      background: "rgba(255, 255, 255, 0.3)",
      overflowY: "scroll", // Allow scrolling if content overflows
      scrollbarWidth: "none", // Use thin scrollbar
    })
    Main_container.appendChild(priority_div);
  }
  const priority1 = document.getElementById("priority-1");
  const priority2 = document.getElementById("priority-2");
  const priority3 = document.getElementById("priority-3");
  Object.assign(priority1.style, {
    backgroundColor: "rgba(255, 0, 0, 0.8)", // Red for high priority
  });
  Object.assign(priority2.style, {
    backgroundColor: "rgba(255, 165, 0, 0.8)", // Orange for medium priority
  });
  Object.assign(priority3.style, {
    backgroundColor: "rgba(0, 255, 0, 0.8)", // Green for low priority
  });
  renderTasks()
}
function renderTasks() {
  console.log("Rendering tasks...");

  // Retrieve tasks from chrome.storage.sync
  chrome.storage.sync.get("tasks", function (result) {
    const tasks = result.tasks || [];
    console.log("Tasks retrieved:", tasks); // Debugging log

    // Clear existing tasks in priority containers
    document.getElementById("priority-1").innerHTML = "";
    document.getElementById("priority-2").innerHTML = "";
    document.getElementById("priority-3").innerHTML = "";



    tasks.forEach(task => {
      console.log("Rendering task:", task); // Debugging log
      console.log("Task priority:", task.task_priority); // Debugging log for priority

      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      Object.assign(taskDiv.style, {
        width: "95%", // Slightly wider for a cleaner edge-to-edge look
        margin: "5px auto", // Reduced margin for a tighter layout
        padding: "10px", // Reduced padding for simplicity
        borderRadius: "5px", // Smaller radius for a sharper look
        backgroundColor: "rgb(34, 40, 49)", // Lighter background for minimalism
        fontFamily: "'Arial', sans-serif",
        fontSize: "0.9rem", // Slightly smaller font for a compact feel
        color: "#ffffff", // Keep white text for contrast
        // borderLeft: `3px solid ${priorityColors[task.task_priority] || "#ffffff"}`, // Thinner priority-based border
        transition: "transform 0.2s ease" // Simplified transition (removed box-shadow transition)
      });

      // Add task details with better formatting
      taskDiv.innerHTML = `
        <h3 style="margin: 0 0 10px; font-size: 1.2rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
          ${task.task_name || "Unnamed Task"}
        </h3>
        <p style="margin: 5px 0; font-size: 0.9rem;">
          <strong>Priority:</strong> ${task.task_priority || "Not set"}
        </p>
        <p style="margin: 5px 0; font-size: 0.9rem;">
          <strong>Deadline:</strong> ${task.task_deadline || "No deadline"}
        </p>
        <p style="margin: 5px 0; font-size: 0.9rem;">
          <strong>Time:</strong> ${task.task_time || "No time"}
        </p>
        <p style="margin: 5px 0; font-size: 0.9rem;">
          <strong>Description:</strong> ${task.task_description || "No description"}
        </p>
      `;
      // Add a checkbox to mark the task as done
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.style.marginRight = "10px";
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          taskDiv.style.textDecoration = "line-through";
          taskDiv.style.opacity = "0.6";
        } else {
          taskDiv.style.textDecoration = "none";
          taskDiv.style.opacity = "1";
        }
      });

      // Prepend the checkbox to the task div
      taskDiv.prepend(checkbox);

      // Append to the appropriate priority container
      if (task.task_priority === "high") {
        console.log("Appending to High priority container"); // Debugging log
        const priorityContainer = document.getElementById("priority-1");
        priorityContainer.appendChild(taskDiv);
      } else if (task.task_priority === "medium") {
        console.log("Appending to Medium priority container"); // Debugging log
        const priorityContainer = document.getElementById("priority-2");
        priorityContainer.appendChild(taskDiv);
      } else if (task.task_priority === "low") {
        console.log("Appending to Low priority container"); // Debugging log
        const priorityContainer = document.getElementById("priority-3");
        priorityContainer.appendChild(taskDiv);
      } else {
        console.warn("Task priority does not match any container:", task.task_priority); // Debugging log for unmatched priority
      }
    });
  });
}