const db = require('server/db.js'); // Adjust the path as per your project structure

// Example query to retrieve all users
db.query('SELECT * FROM User', (err, rows) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log('Users:', rows);
});


