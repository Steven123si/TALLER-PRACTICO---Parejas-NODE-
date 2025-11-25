import express from "express";
import dotenv from "dotenv";
import tasksRouter from './routes/tasks.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  
app.get("/", (req, res) => {
  res.send("API running");
});
app.use('/tasks', tasksRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
