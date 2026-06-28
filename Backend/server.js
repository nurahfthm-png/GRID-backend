
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// MongoDB
mongoose.connect("mongodb://nurahfthm-grid:nurahfthm-grid@ac-iws3eq7-shard-00-00.1pfprql.mongodb.net:27017,ac-iws3eq7-shard-00-01.1pfprql.mongodb.net:27017,ac-iws3eq7-shard-00-02.1pfprql.mongodb.net:27017/?ssl=true&replicaSet=atlas-2ixbdy-shard-0&authSource=admin&appName=Cluster0")
.then(() => {
    console.log("MongoDB Connected");

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
})
.catch(err => console.log(err));