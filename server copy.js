const express = require('express');
const app = express();
const port = 3000;

let users = [];

app.use(express.json());

// Endpoint para obtener todos los usuarios
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Endpoint para obtener un usuario por su ID
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(u => u.id === parseInt(userId));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

// Endpoint para crear un nuevo usuario
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Endpoint para actualizar un usuario existente
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updateUser = req.body;
  const index = users.findIndex(u => u.id === parseInt(userId));
  if (index !== -1) {
    users[index] = updateUser;
    res.json(updateUser);
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

// Endpoint para eliminar un usuario
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const index = users.findIndex(u => u.id === parseInt(userId));
  if (index !== -1) {
    users.splice(index, 1);
    res.send('Usuario eliminado correctamente');
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

app.listen(port, () => {
  console.log(`Servidor API RESTful iniciado en http://localhost:${port}`);
});
