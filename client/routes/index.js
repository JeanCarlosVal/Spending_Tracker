const express = require('express')
const router = express.Router()
const db = require('../../server/db.js');

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/test', (req, res) => {
    const query = 'SELECT * FROM User';
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Error executing query');
        return;
      }
      res.render('test', { users: results });
    });
  });

module.exports = router