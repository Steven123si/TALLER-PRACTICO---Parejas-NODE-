import prisma from '../prisma/client.js';

// GET /tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// POST /tasks
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const task = await prisma.task.create({
      data: { title, description }
    });

    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating task' });
  }
};

// PUT /tasks/ (id)
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const existing = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: 'Task not found' });

    const updated = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, status }
    });

    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error updating task' });
  }
};

// DELETE /tasks/ (id)
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: 'Task not found' });

    await prisma.task.delete({ where: { id: Number(id) } });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error deleting task' });
  }
};
