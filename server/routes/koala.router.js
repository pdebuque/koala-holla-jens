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
                        (name,age,gender,ready_to_transfer,notes)
                        VALUES ('$1', $2, '$3', '$4', '$5')
    `
    pool.query(queryText, [newKoala.name, newKoala.age, newKoala.gender, newKoala.ready_to_transfer, newKoala.notes])
        .then(() => {
            console.log('POST successful');
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('POST went wrong ', err)
        })
})

// PUT

// put updates the ready for transfer status

router.put('/:id', (req, res) => {
    const queryText = `UPDATE koalas_list SET ready_to_transfer='TRUE' WHERE id=$1`
    pool.query(queryText, [req.params.id])
        .then(() => {
            console.log('changed status success');
            res.sendStatus(202);
        })
        .catch((err) => {
            console.log('could not update status');
            res.sendStatus(500);
        })
})

// DELETE

router.delete('/:id', (req, res) => {
    const queryText = `DELETE FROM koalas_list WHERE id = $1`
    pool.query(queryText, [req.params.id])
        .then(() => {
            console.log('successful delete');
            res.sendStatus(202)
        })
        .catch((err) => {
            console.log('could not delete', err);
            res.sendStatus(500)
        })
})

module.exports = router;