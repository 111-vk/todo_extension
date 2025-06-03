console.log("Backend script is running...");
document.addEventListener("DOMContentLoaded", function () {
    // console.log("DOM fully loaded and parsed. Initializing event listeners...");
    add_button.click();
});

const add_button = document.querySelector("#add");

add_button.addEventListener("click", ask_name);
// task detales 
let task_name
let task_description
let task_priority
let task_deadline
let task_time
renderTasks();

// render the stored tasks from localStorage to show on the dashboard 
function renderTasks() {
    if (!chrome.storage || !chrome.storage.sync) {
        console.error("chrome.storage.sync is not available. Ensure the script is running in a Chrome extension context.");
        return;
    }

    chrome.storage.sync.get("tasks", function (result) {
        const tasks = result.tasks || [];

        // Clear existing tasks before rendering
        const taskList = document.querySelector("#list");
        if (!taskList) {
            console.error("Task list element not found in the DOM.");
            return;
        }
        taskList.innerHTML = ""; // Clear existing tasks

        // Render each task
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.className = "task-item";

            // Create a checkbox for marking tasks as done
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.done || false; // Reflect the 'done' state
            checkbox.addEventListener("change", () => {
                tasks[index].done = checkbox.checked; // Update the 'done' state
                chrome.storage.sync.set({ tasks }); // Save the updated tasks
            });

            // Style the task item based on the 'done' state
            if (task.done) {
                taskItem.style.textDecoration = "line-through";
                taskItem.style.opacity = "0.6";
            }

            checkbox.style.marginRight = "10px";
            taskItem.appendChild(checkbox);

            taskItem.innerHTML += `
                <h3>${task.task_name || "Unnamed Task"}</h3>
                <p>${task.task_description || "No description"}</p>
                <p>Priority: ${task.task_priority || "Not set"}</p>
                <p>Deadline: ${task.task_deadline || "No deadline"}</p>
                <p>Time: ${task.task_time || "No time"}</p>
            `;

            taskList.appendChild(taskItem);
        });
        console.log("Tasks rendered successfully.");
    })

}


// i was trying to make it look good :(


// function renderTasks() {
//   console.log("Rendering tasks...");

//   // Retrieve tasks from chrome.storage.sync
//   chrome.storage.sync.get("tasks", function (result) {
//     const tasks = result.tasks || [];
//     console.log("Tasks retrieved:", tasks); // Debugging log

//     // Clear existing tasks in priority containers
//     document.getElementById("priority-1").innerHTML = "";
//     document.getElementById("priority-2").innerHTML = "";
//     document.getElementById("priority-3").innerHTML = "";



//     tasks.forEach(task => {
//       console.log("Rendering task:", task); // Debugging log
//       console.log("Task priority:", task.task_priority); // Debugging log for priority

//       const taskDiv = document.createElement("div");
//       taskDiv.classList.add("task");
//       Object.assign(taskDiv.style, {
//         width: "98%", // Slightly wider for a cleaner edge-to-edge look
//         margin: "5px auto", // Reduced margin for a tighter layout
//         padding: "10px", // Reduced padding for simplicity
//         borderRadius: "5px", // Smaller radius for a sharper look
//         background: "rgba(black)", // Lighter background for minimalism
//         fontFamily: "'Arial', sans-serif",
//         fontSize: "0.9rem", // Slightly smaller font for a compact feel
//         color: "#ffffff", // Keep white text for contrast
//         // borderLeft: `3px solid ${priorityColors[task.task_priority] || "#ffffff"}`, // Thinner priority-based border
//         transition: "transform 0.2s ease" // Simplified transition (removed box-shadow transition)
//       });

//       // Add task details with better formatting
//       taskDiv.innerHTML = `
//         <h3 style="margin: 0 0 10px; font-size: 1.2rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
//           ${task.task_name || "Unnamed Task"}
//         </h3>
//         <p style="margin: 5px 0; font-size: 0.9rem;">
//           <strong>Priority:</strong> ${task.task_priority || "Not set"}
//         </p>
//         <p style="margin: 5px 0; font-size: 0.9rem;">
//           <strong>Deadline:</strong> ${task.task_deadline || "No deadline"}
//         </p>
//         <p style="margin: 5px 0; font-size: 0.9rem;">
//           <strong>Time:</strong> ${task.task_time || "No time"}
//         </p>
//         <p style="margin: 5px 0; font-size: 0.9rem;">
//           <strong>Description:</strong> ${task.task_description || "No description"}
//         </p>
//       `;


//       // Append to the appropriate priority container
//       if (task.task_priority === "high") {
//         console.log("Appending to High priority container"); // Debugging log
//         const priorityContainer = document.getElementById("priority-1");
//         priorityContainer.appendChild(taskDiv);
//       } else if (task.task_priority === "medium") {
//         console.log("Appending to Medium priority container"); // Debugging log
//         const priorityContainer = document.getElementById("priority-2");
//         priorityContainer.appendChild(taskDiv);
//       } else if (task.task_priority === "low") {
//         console.log("Appending to Low priority container"); // Debugging log
//         const priorityContainer = document.getElementById("priority-3");
//         priorityContainer.appendChild(taskDiv);
//       } else {
//         console.warn("Task priority does not match any container:", task.task_priority); // Debugging log for unmatched priority
//       }
//     });
//   });
// }






function ask_name() {
    const name_diver = document.createElement("div");
    name_diver.id = "name_diver";

    Object.assign(name_diver.style, {
        position: "fixed",
        width: "90%",
        height: "200px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // Center both horizontally and vertically
        background: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        zIndex: "1000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.3s ease-in-out"
    });

    const name_input = document.createElement("input");

    Object.assign(name_input.style, {
        width: "80%",
        height: "40px",
        margin: "10px 0",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "border-color 0.3s ease"
    });


    const name_diver_heading = document.createElement("h2");
    name_diver_heading.textContent = "Enter Task Name";
    Object.assign(name_diver_heading.style, {
        margin: "0 0 20px",
        fontSize: "24px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "1px",
        textAlign: "center",
        color: "#333" // Dark text for contrast
    });
    name_diver.appendChild(name_diver_heading);

    const exit_info = document.createElement("p");
    exit_info.textContent = "Press ESC to exit";
    Object.assign(exit_info.style, {
        margin: "0 0 20px",
        marginTop: "15px",
        fontSize: "14px",
        fontWeight: "400",
        textTransform: "uppercase",
        letterSpacing: "1px",
        textAlign: "center",
        color: "red" // Light text for contrast
    });

    name_input.type = "text";
    name_input.placeholder = "Enter a Task name";

    // Add focus effect
    name_input.addEventListener("focus", () => {
        name_input.style.borderColor = "#007BFF";
    });

    name_input.addEventListener("blur", () => {
        name_input.style.borderColor = "#ccc";
    });

    name_diver.appendChild(name_input);

    name_diver.appendChild(exit_info);
    document.body.appendChild(name_diver);

    name_input.focus();


    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            const name_diver = document.getElementById("name_diver");
            if (name_diver) {
                document.body.removeChild(name_diver);
            }
        }
    });

    name_input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            task_name = name_input.value;
            ask_description();
        }
    });
}



function ask_description() {
    document.body.removeChild(document.getElementById("name_diver"));
    alert("task name is " + task_name);

    const description_dive = document.createElement("div");
    description_dive.id = "description_diver";

    Object.assign(description_dive.style, {
        position: "fixed",
        width: "90%",
        height: "200px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // Center both horizontally and vertically
        background: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        zIndex: "1000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.3s ease-in-out"
    });


    const description_diver_heading = document.createElement("h2");
    description_diver_heading.textContent = "Enter Task Description";
    Object.assign(description_diver_heading.style, {
        margin: "0 0 20px",
        fontSize: "24px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "1px",
        textAlign: "center",
        color: "#333" // Dark text for contrast
    });
    description_dive.appendChild(description_diver_heading);


    const info_to_skip_the_description = document.createElement("p");
    info_to_skip_the_description.textContent = "You can skip this step by pressing space";
    Object.assign(info_to_skip_the_description.style, {
        margin: "0 0 10px",
        fontSize: "14px",
        fontWeight: "400",
        textAlign: "center",
        color: "#666" // Lighter text for less emphasis
    });
    description_dive.appendChild(info_to_skip_the_description);


    const description_input = document.createElement("input");

    Object.assign(description_input.style, {
        width: "80%",
        height: "40px",
        margin: "10px 0",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "border-color 0.3s ease"
    });

    description_input.type = "text";
    description_input.placeholder = "Enter a Task description";

    // Add focus effect
    description_input.addEventListener("focus", () => {
        description_input.style.borderColor = "#007BFF";
    });

    description_input.addEventListener("blur", () => {
        description_input.style.borderColor = "#ccc";
    });

    description_dive.appendChild(description_input);
    document.body.appendChild(description_dive);


    // Add event listener for Escape key to remove the description div
    description_dive.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            const description_diver = document.getElementById("description_diver");
            if (description_diver) {
                document.body.removeChild(description_diver);
            }
        } else if (event.key === " ") {
            // If space is pressed, skip to priority selection
            task_description = "No description provided"; // Default value if skipped
            ask_priority(); // Proceed to priority selection
        }
    });



    description_input.focus();
    description_input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            task_description = description_input.value;
            ask_priority();
        }
    });

}

function ask_priority() {
    // Remove the description div
    document.body.removeChild(document.getElementById("description_diver"));
    // Alert the task description
    alert("Task description is: " + task_description);

    // Create the priority selection div
    const askPriorityDiv = document.createElement("div");
    askPriorityDiv.id = "ask_priority_div";

    // Style the priority div
    Object.assign(askPriorityDiv.style, {
        position: "fixed",
        width: "90%",
        maxWidth: "400px", // Limit width for better readability
        height: "200px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        zIndex: "1000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.3s ease-in-out",
        color: "#333", // Dark text for contrast
        fontFamily: "'Arial', sans-serif"
    });

    // Add a heading for clarity
    const heading = document.createElement("h2");
    heading.textContent = "Select Priority";
    Object.assign(heading.style, {
        margin: "0 0 20px",
        fontSize: "24px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "1px"
    });
    askPriorityDiv.appendChild(heading);

    // Create the dropdown
    const priorityDropdown = document.createElement("select");
    Object.assign(priorityDropdown.style, {
        width: "80%",
        height: "40px",
        margin: "10px 0",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "border-color 0.3s ease"
    });

    // Add options to the dropdown
    const priorities = ["High", "Medium", "Low"];
    priorities.forEach((priority) => {
        const option = document.createElement("option");
        option.value = priority.toLowerCase();
        option.textContent = priority;
        priorityDropdown.appendChild(option);
    });

    askPriorityDiv.appendChild(priorityDropdown);

    // Add a button to confirm the selection
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";
    Object.assign(confirmButton.style, {
        height: "40px",
        width: "150px",
        margin: "10px 0",
        background: "#007BFF",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "600",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease"
    });

    confirmButton.addEventListener("click", () => {
        task_priority = priorityDropdown.value;
        document.body.removeChild(askPriorityDiv);
        ask_deadline(); // Proceed to the next step
    });

    confirmButton.addEventListener("mouseover", () => {
        confirmButton.style.backgroundColor = "#0056b3";
    });

    confirmButton.addEventListener("mouseout", () => {
        confirmButton.style.backgroundColor = "#007BFF";
    });

    askPriorityDiv.appendChild(confirmButton);

    // Add keyboard navigation for the dropdown
    priorityDropdown.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            task_priority = priorityDropdown.value;
            document.body.removeChild(askPriorityDiv);
            ask_deadline(); // Proceed to the next step
        } else if (event.key === "ArrowUp") {
            // Move to the previous option
            if (priorityDropdown.selectedIndex > 0) {
                priorityDropdown.selectedIndex -= 1;
            }
        } else if (event.key === "ArrowDown") {
            // Move to the next option
            if (priorityDropdown.selectedIndex < priorityDropdown.options.length - 1) {
                priorityDropdown.selectedIndex += 1;
            }
        }
    });

    document.body.appendChild(askPriorityDiv);

    // Focus on the dropdown for keyboard navigation
    priorityDropdown.focus();
}

function test() {
    console.table({
        task_name: task_name,
        task_description: task_description,
        task_priority: task_priority,
        task_deadline: task_deadline,
        stask_time: task_time
    });
    ask_deadline(); // Call ask_deadline to proceed to the next step

}


function ask_deadline() {
    // Check if the priority selection div exists before removing it
    const priorityDiv = document.getElementById("ask_priority_div");
    if (priorityDiv && priorityDiv instanceof Node) {
        document.body.removeChild(priorityDiv);
    } else {
        console.error("ask_priority_div does not exist or is not a valid Node.");
    }

    // Create the deadline input div
    const deadlineDiv = document.createElement("div");
    deadlineDiv.id = "deadline_div";

    Object.assign(deadlineDiv.style, {
        position: "fixed",
        width: "90%",
        maxWidth: "400px", // Limit width for better readability
        height: "300px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        zIndex: "1000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.3s ease-in-out",
        fontFamily: "'Arial', sans-serif",
        color: "#333"
    });

    // Add a heading for clarity
    const heading = document.createElement("h2");
    heading.textContent = "Select Deadline";
    Object.assign(heading.style, {
        margin: "0 0 20px",
        fontSize: "24px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "1px",
        textAlign: "center"
    });
    deadlineDiv.appendChild(heading);

    // Create the date input
    const deadlineInput = document.createElement("input");
    deadlineInput.type = "date";
    Object.assign(deadlineInput.style, {
        width: "80%",
        height: "50px",
        margin: "10px 0",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "border-color 0.3s ease",
        background: "#f9f9f9",
        color: "#333",
        textAlign: "center"
    });

    // Set default value to today's date
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    deadlineInput.value = today.toISOString().split("T")[0];

    deadlineDiv.appendChild(deadlineInput);

    // Add buttons for "Today" and "Tomorrow"
    const todayButton = document.createElement("button");
    todayButton.textContent = "Today";
    Object.assign(todayButton.style, {
        height: "40px",
        width: "150px",
        margin: "10px 5px",
        background: "#007BFF",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "600",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease"
    });

    todayButton.addEventListener("click", () => {
        task_deadline = today.toISOString().split("T")[0];
        alert("Task deadline is: " + task_deadline);
        ask_time(); // Proceed to the next step
    });

    const tomorrowButton = document.createElement("button");
    tomorrowButton.textContent = "Tomorrow";
    Object.assign(tomorrowButton.style, {
        height: "40px",
        width: "150px",
        margin: "10px 5px",
        background: "#28a745",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "600",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease"
    });

    tomorrowButton.addEventListener("click", () => {
        task_deadline = tomorrow.toISOString().split("T")[0];
        alert("Task deadline is: " + task_deadline);
        ask_time(); // Proceed to the next step
    });

    deadlineDiv.appendChild(todayButton);
    deadlineDiv.appendChild(tomorrowButton);

    // Add a confirm button
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";
    Object.assign(confirmButton.style, {
        height: "40px",
        width: "150px",
        margin: "20px 0 0",
        background: "#007BFF",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "600",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease"
    });

    confirmButton.addEventListener("click", () => {
        task_deadline = deadlineInput.value;
        alert("Task deadline is: " + task_deadline);
        ask_time(); // Proceed to the next step
    });

    deadlineDiv.appendChild(confirmButton);

    document.body.appendChild(deadlineDiv);

    // Focus on the input field
    deadlineInput.focus();

    deadlineInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            task_deadline = deadlineInput.value;
            alert("Task deadline is: " + task_deadline);
            ask_time(); // Proceed to the next step
        }
    });
}

// ask time 
function ask_time() {
    document.body.removeChild(document.getElementById("deadline_div"));

    // Create the time input div
    const timeDiv = document.createElement("div");
    timeDiv.id = "time_div";

    Object.assign(timeDiv.style, {
        position: "fixed",
        width: "90%",
        maxWidth: "400px", // Limit width for better readability
        height: "250px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        zIndex: "1000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.3s ease-in-out",
        fontFamily: "'Arial', sans-serif",
        color: "#333"
    });

    // Add a heading for clarity
    const heading = document.createElement("h2");
    heading.textContent = "Select Time";
    Object.assign(heading.style, {
        margin: "0 0 20px",
        fontSize: "24px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "1px",
        textAlign: "center"
    });
    timeDiv.appendChild(heading);

    // Create the time input
    const timeInput = document.createElement("input");
    timeInput.type = "time";
    Object.assign(timeInput.style, {
        width: "80%",
        height: "50px",
        margin: "10px 0",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
        boxShadow: "inset 0 2px 4px, rgba(0, 0, 0, 0.1)",
        transition: "border-color 0.3s ease",
        background: "#f9f9f9",
        color: "#333",
        textAlign: "center"

    });
    const done_button = document.createElement("button");
    done_button.textContent = "Done";
    Object.assign(done_button.style, {
        height: "40px",
        width: "150px",
        margin: "20px 0 0",
        background: "#007BFF",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "600",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease"
    });


    done_button.addEventListener("click", () => {
        task_time = timeInput.value;
        alert("Task time is: " + task_time);
        document.body.removeChild(timeDiv);
        test(); // Call test function to log details
        showtdata(); // Call showtdata to display the final details
    });
    timeInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            console.log("all done");

            done_button.click();
        }
    });


    timeDiv.appendChild(timeInput);
    timeDiv.appendChild(done_button)
    document.body.appendChild(timeDiv);


}

function showtdata() {
    // Check if the time div exists before removing it

    const priorityDiv = document.getElementById("time_div");
    const deadlineDiv = document.getElementById("deadline_div");
    if (deadlineDiv && deadlineDiv instanceof Node) {
        document.body.removeChild(deadlineDiv);
    } else {
        console.error("deadline_div does not exist or is not a valid Node.");
    }
    if (priorityDiv && priorityDiv instanceof Node) {
        document.body.removeChild(priorityDiv);
    } else {
        console.error("ask_priority_div does not exist or is not a valid Node.");
    }




    const finalDiv = document.createElement("div");
    finalDiv.id = "final_div";
    Object.assign(finalDiv.style, {
        position: "fixed",
        width: "90%",
        maxWidth: "500px",
        height: "auto",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(255, 255, 255, 0.4)", // Match dashboard's semi-transparent style
        backdropFilter: "blur(5px)", // Glassmorphism effect
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        zIndex: "1000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.3s ease-in-out",
        fontFamily: "'Arial', sans-serif",
        color: "#ffffff" // White text for contrast on dark background
    });

    const heading = document.createElement("h2");
    heading.textContent = "Task Details";
    Object.assign(heading.style, {
        margin: "0 0 20px",
        fontSize: "24px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "1px",
        textAlign: "center",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)"
    });
    finalDiv.appendChild(heading);

    // Create a table for task details
    const table = document.createElement("table");
    Object.assign(table.style, {
        width: "100%",
        borderCollapse: "separate", // Allows for rounded corners and spacing
        borderSpacing: "0", // Remove spacing between cells
        marginBottom: "20px",
        background: "rgba(255, 255, 255, 0.05)", // Slight background for table
        borderRadius: "8px",
        overflow: "hidden" // Ensure rounded corners clip content
    });

    const tableData = [
        { label: "Task Name", value: task_name },
        { label: "Task Description", value: task_description },
        { label: "Task Priority", value: task_priority },
        { label: "Task Deadline", value: task_deadline },
        { label: "Task Time", value: task_time }
    ];

    tableData.forEach((row, index) => {
        const tr = document.createElement("tr");

        const tdLabel = document.createElement("td");
        tdLabel.textContent = row.label;
        Object.assign(tdLabel.style, {
            padding: "12px 15px",
            fontWeight: "600",
            fontSize: "14px",
            color: "#ffffff", // White text for contrast
            background: index % 2 === 0 ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)", // Alternating background
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
            textAlign: "left",
            transition: "background 0.3s ease"
        });

        const tdValue = document.createElement("td");
        tdValue.textContent = row.value || "Not set"; // Fallback if value is empty
        Object.assign(tdValue.style, {
            padding: "12px 15px",
            fontSize: "14px",
            color: "#ffffff",
            background: index % 2 === 0 ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            textAlign: "left",
            transition: "background 0.3s ease"
        });

        // Remove bottom border for the last row
        if (index === tableData.length - 1) {
            tdLabel.style.borderBottom = "none";
            tdValue.style.borderBottom = "none";
        }

        // Hover effect for rows
        tr.addEventListener("mouseover", () => {
            tdLabel.style.background = "rgba(255, 255, 255, 0.2)";
            tdValue.style.background = "rgba(255, 255, 255, 0.2)";
        });

        tr.addEventListener("mouseout", () => {
            tdLabel.style.background = index % 2 === 0 ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)";
            tdValue.style.background = index % 2 === 0 ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)";
        });

        tr.appendChild(tdLabel);
        tr.appendChild(tdValue);
        table.appendChild(tr);
    });

    finalDiv.appendChild(table);

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";
    Object.assign(confirmButton.style, {
        height: "40px",
        width: "150px",
        margin: "20px 0 0",
        background: "linear-gradient(135deg, #4b5563, #1f2937)", // Match dashboard button style
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "1px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease"
    });




    finalDiv.appendChild(confirmButton);
    document.body.appendChild(finalDiv);
    // Store the task details in localStorage
    confirmButton.addEventListener("click", () => {
        alert("Task has been added successfully!");
        document.body.removeChild(finalDiv);
        send_data();
        document.body.removeChild(document.getElementById("time_div"));
        document.body.removeChild(document.getElementById("deadline_div"));

    });
}

// send the data to localStorage and reload the page
// function send_data() {
//     // Retrieve the existing tasks from localStorage
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     // Create a new task object
//     const newTask = {
//         task_name: task_name,
//         task_description: task_description,
//         task_priority: task_priority,
//         task_deadline: task_deadline,
//         task_time: task_time
//     };

//     // Add the new task to the tasks array
//     tasks.push(newTask);

//     // Save the updated tasks array back to localStorage
//     localStorage.setItem("tasks", JSON.stringify(tasks));

//     // Clear the task details after sending
//     task_name = "";
//     task_description = "";
//     task_priority = "";
//     task_deadline = "";
//     task_time = "";

//     // Reload the page or update the UI
//     location.reload();
// }



function send_data() {
    if (!chrome.storage || !chrome.storage.sync) {
        console.error("chrome.storage.sync is not available. Ensure the script is running in a Chrome extension context.");
        return;
    }

    // Retrieve the existing tasks from chrome.storage
    chrome.storage.sync.get(['tasks'], (result) => {
        const tasks = result.tasks || [];

        // Create a new task object
        const newTask = {
            task_name: task_name,
            task_description: task_description,
            task_priority: task_priority,
            task_deadline: task_deadline,
            task_time: task_time
        };

        // Add the new task to the tasks array
        tasks.push(newTask);

        // Save the updated tasks array back to chrome.storage
        chrome.storage.sync.set({ tasks }, () => {
            console.log('Task saved successfully:', newTask);

            // Clear the task details after sending
            task_name = "";
            task_description = "";
            task_priority = "";
            task_deadline = "";
            task_time = "";

            // Update the UI by re-rendering tasks
            location.reload(); // Reload the page to reflect changes
            // renderTasks(); // Alternatively, you can call renderTasks() to update the UI without reloading

        });
    });
}
