const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'Neelam@28',
  database: 'injection'
});

// Function to execute a query with parameters
function executeQuery(query, callback, params) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err, null);
      return;
    }

    connection.query(query, params, (err, results) => {
      connection.release(); // Release the connection

      if (err) {
        callback(err, null);
        return;
      }

      callback(null, results);
    });
  });
}

// Example usage:
const userInput = "usr' OR 1=1-- "; // Simulating user input
const userInputPassword = "pss"
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
executeQuery(query, (err, results) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Results:', results);
}, [userInput, userInputPassword]);