// Create web server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

// Read comments from file
let comments = JSON.parse(fs.readFileSync('./comments.json'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET method route
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST method route
app.post('/comments', (req, res) => {
  comments.push(req.body);
  fs.writeFileSync('./comments.json', JSON.stringify(comments));
  res.json(comments);
});

// PUT method route
app.put('/comments/:id', (req, res) => {
  let id = req.params.id;
  comments[id] = req.body;
  fs.writeFileSync('./comments.json', JSON.stringify(comments));
  res.json(comments);
});

// DELETE method route
app.delete('/comments/:id', (req, res) => {
  let id = req.params.id;
  comments.splice(id, 1);
  fs.writeFileSync('./comments.json', JSON.stringify(comments));
  res.json(comments);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});