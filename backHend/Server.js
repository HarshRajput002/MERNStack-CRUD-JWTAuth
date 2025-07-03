import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import ExpUser from './UserSchema.js';
import ExpTask from './Task.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));



const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, "jwt_Token_Key");
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

app.post("/api/register", async (req, res) => {
  try {
    const newUser = new ExpUser(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});


app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await ExpUser.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, username }, "jwt_Token_Key", { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});


app.post('/api/crud', authenticate, async (req, res) => {
  try {
      console.log("Request body:", req.body); 
  console.log("Authenticated user ID:", req.user.id); 
    const { task, details } = req.body;
    const newTask = new ExpTask({
      userId: req.user.id,
      task,
      details
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Task creation failed" });
  }
});


app.get('/crud', authenticate, async (req, res) => {
  try {
    const tasks = await ExpTask.find({ userId: req.user.id });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Fetching tasks failed" });
  }
});

app.put("/api/crud/:id", authenticate, async (req, res) => {
  try {
    const { task, details } = req.body;

    const updatedTask = await ExpTask.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, 
      { task, details },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Task update failed" });
  }
});

app.delete("/api/crud/:id", authenticate, async (req, res) => {
  try {
    const deletedTask = await ExpTask.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, 
    });

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Task deletion failed" });
  }
});



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});

