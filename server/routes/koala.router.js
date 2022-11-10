const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION

const pool = require('../modules/pool')

// GET

router.get('/', (req,res) =>{
    console.log('in router get', req)
    let queryText = 'SELECT * FROM "koalas_list";';  // is this right?
    pool.query(queryText)
    .then((result) => {
        console.log('its working!',result.rows)
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('where are the koalas', error);
        res.sendStatus(500);
    })

})

// POST



// PUT


// DELETE

module.exports = koalaRouter;