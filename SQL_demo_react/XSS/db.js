const sqlite3 = require('sqlite3').verbose();


function connectDB() {
  const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      db.run('CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, comment TEXT)', (createErr) => {
        if (createErr) {
          console.error(createErr.message);
        }
      });
    }
  });
  return db;
}


function addComment(comment) {
  const db = connectDB();
  db.run('INSERT INTO comments (comment) VALUES (?)', comment, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  db.close();
}

function getComments(searchQuery, callback) {
  const db = connectDB();
  let getQuery = 'SELECT comment FROM comments';
  db.all(getQuery, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    let results = [];
    if (searchQuery) {
      results = rows.filter(row => row.comment.includes(searchQuery)).map(row => row.comment);
    } else {
      results = rows.map(row => row.comment);
    }
    callback(results);
  });
  db.close();
}

module.exports = {
  addComment,
  getComments,
};
