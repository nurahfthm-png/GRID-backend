console.log("task.js loaded");

document.getElementById("addTaskBtn").addEventListener("click", async () => {

    const title = document.getElementById("taskTitle").value;
    const priority = document.getElementById("taskPriority").value;
    const dueDate = document.getElementById("taskDueDate").value;
    const status = document.getElementById("taskStatus").value;

    try {

        const response = await fetch(
            "http://localhost:3000/api/tasks",
            {
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
            }
        );

        const data = await response.json();

        console.log(data);

      const modalElement = document.getElementById("createTaskModal");

const modal = bootstrap.Modal.getInstance(modalElement);

modal.hide();

    } catch (error) {

        console.error(error);

        alert("Error Adding Task");

    }

});