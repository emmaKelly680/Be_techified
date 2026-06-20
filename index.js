require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// custom logging middleware 
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('My Week 2 API!');
});

app.post('/user', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  res.json({ message: `Hello, ${name}!` });
});

app.get('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));


