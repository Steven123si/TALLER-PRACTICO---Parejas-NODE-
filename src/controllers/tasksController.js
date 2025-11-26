import { prisma } from '../prisma/client.js';

// GET /tasks – solo tareas del usuario autenticado
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id }  
    });

    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error obteniendo tareas' });
  }
};

// POST /tasks – crear tarea asociada al usuario autenticado
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title)
      return res.status(400).json({ message: 'Title is required' });

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.id  
      }
    });

    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creando tarea' });
  }
};

// PUT /tasks/:id – solo si la tarea es del usuario autenticado
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const existing = await prisma.task.findFirst({
      where: { id: Number(id), userId: req.user.id }
    });

    if (!existing)
      return res.status(404).json({ message: 'Task not found or unauthorized' });

    const updated = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, status }
    });

    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error actualizando tarea' });
  }
};

// DELETE /tasks/:id – solo si es del usuario autenticado
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.task.findFirst({
      where: { id: Number(id), userId: req.user.id }
    });

    if (!existing)
      return res.status(404).json({ message: 'Task not found or unauthorized' });

    await prisma.task.delete({
      where: { id: Number(id) }
    });

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error eliminando tarea' });
  }
};
