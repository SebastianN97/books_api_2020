const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pool } = require("./config");
const { response } = require("express");

const app = express();

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())

  const index = (request, response) => {
    pool.query('SELECT * FROM books', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({books: results.rows})
    })
  }

  const create = (request, response) => {
    
    const { author, title } = request.body

     pool.query('INSERT INTO books (author, title) VALUES ($1, $2)', [author, title], (error) => {
       if (error) {
         throw error
       }
       response.status(201).json({message: 'book was added to the database!'})
     })
  }

  app
    .route('/books')
    .get(index)
    .post(create)


  app.listen(process.env.PORT || 3002, () => {
    console.log('the server is listening...')
  })
