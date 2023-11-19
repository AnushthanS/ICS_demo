const express = require('express');
const db = require('./db');

const app = express();
app.set('view engine', 'ejs'); // Set EJS as the view engine
// app.set('views', './views'); // Set the directory where your EJS files are located

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  const searchQuery = req.query.q;

  db.getComments(searchQuery, (comments) => {
    res.render('index', { comments, searchQuery });
  });
});

app.post('/', (req, res) => {
  const comment = req.body.comment;
  db.addComment(comment);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
