// const { Router } = require('express');
const express = require('express');
const router = express.Router();

// DB CONNECTION

const pool = require('../modules/pool')

// GET

router.get('/', (req, res) => {
    console.log('in router get', req)
    let queryText = 'SELECT * FROM "koalas_list";';  // is this right?
    pool.query(queryText)
        .then((result) => {
            console.log('its working!', result.rows)
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('where are the koalas', error);
            res.sendStatus(500);
        })
})

// POST
router.post('/', (req, res) => {
    console.log('in POST request at /koalas');
    const newKoala = req.body;
    const queryText = `INSERT INTO koalas_list
                        (name,age,gender,ready_for_transfer,notes)
                        VALUES ('$1', $2, '$3', $4, '$5')
    `
    pool.query(queryText, [newKoala.name, newKoala.age, newKoala.gender, newKoala.ready_for_transfer, newKoala.notes])
        .then(() => {
            console.log('POST successful');
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('POST went wrong ', err)
        })
})

// PUT


// DELETE

module.exports = router;