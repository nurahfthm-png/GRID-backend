console.log("mytask.js loaded");

async function loadTasks() {

    try {

        const response = await fetch(
            "http://localhost:3000/api/tasks"
        );

        const tasks = await response.json();

        const container =
            document.getElementById("tasksContainer");

        container.innerHTML = "";

        tasks.forEach(task => {

            container.innerHTML += `
            <div class="task-row">

                <div class="task-left">
                    <input type="checkbox"
                    ${task.completed ? "checked" : ""}>

                    <span>${task.title}</span>
                </div>

                <div class="task-right">

                    <span class="task-date">
                        ${task.dueDate ?
                        new Date(task.dueDate)
                        .toLocaleDateString() : ""}
                    </span>

                    <i class="fa-regular fa-trash-can delete-icon"
                       data-id="${task._id}">
                    </i>

                    <i class="fa-solid fa-pen edit-icon"
                       data-id="${task._id}">
                    </i>

                </div>

            </div>
            `;
        });

        attachDeleteEvents();

    } catch (error) {

        console.error(error);

    }
}

function attachDeleteEvents() {

    document.querySelectorAll(".delete-icon")
        .forEach(icon => {

            icon.addEventListener("click", async function () {

                const taskId =
                    this.getAttribute("data-id");

                if (!confirm("Delete this task?"))
                    return;

                try {

                    await fetch(
                        `http://localhost:3000/api/tasks/${taskId}`,
                        {
                            method: "DELETE"
                        }
                    );

                    this.closest(".task-row").remove();

                } catch (error) {

                    console.error(error);

                }

            });

        });

}

loadTasks();

// Add Task
document.getElementById("addTaskBtn").addEventListener("click", async function () {

    const title = document.getElementById("taskTitle").value;
    const priority = document.getElementById("taskPriority").value;
    const dueDate = document.getElementById("taskDueDate").value;
    const status = document.getElementById("taskStatus").value;

    try {

        const response = await fetch("http://localhost:3000/api/tasks", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                title,
                priority,
                dueDate,
                completed: status === "Completed"

            })

        });

        if (!response.ok) {
            throw new Error("Failed to add task");
        }

        // Reload tasks from MongoDB
        loadTasks();

        // Close the modal
        const modal = bootstrap.Modal.getInstance(
            document.getElementById("createTaskModal")
        );

        modal.hide();

        // Clear the form
        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDescription").value = "";
        document.getElementById("taskPriority").value = "High";
        document.getElementById("taskDueDate").value = "";
        document.getElementById("taskStatus").value = "Pending";

    } catch (error) {

        console.error(error);

        alert("Error adding task");

    }

});