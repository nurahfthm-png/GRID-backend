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

        alert("Task Added Successfully!");

    } catch (error) {

        console.error(error);

        alert("Error Adding Task");

    }

});

async function loadTasks() {

    try {

        const response = await fetch("http://localhost:3000/api/tasks");

        const tasks = await response.json();

        console.log(tasks);

    } catch (error) {

        console.error(error);

    }

}

loadTasks();