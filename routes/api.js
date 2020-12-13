let express = require('express')
let db = require('../models')
let Record = db.Record
let Sequelize = require('sequelize')

let router = express.Router()
//gets all records
router.get('/records', function(req, res, next){
    Record.findAll().then( records => {
        return res.json(records)
    }).catch( err => next(err))
})
//post adds a new record, makes sure the request is valid and throws catch errors
router.post('/records', function(req, res, next){
    Record.create( req.body ).then( data => {
        return res.status(201).send('created')
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)
        }
        return next(err)
    })
})
//i left this for a possible future update- i would like to fix the edit function
// router.patch('/records/:uniqueKey', function( req, res, next){
//     Record.update( req.body, {
//         where: {
//             uniqueKey: req.params.uniqueKey
//         }
//     }).then( rowModified => {
//         if (!rowModified[0]) { //if there are no rows modified
//             return res.status(404).send('Not Found')
//         } else {
//             return res.send('ok')
//         }
//     }).catch( err => {
//         if (err instanceof Sequelize.ValidationError) {
//             let messages = err.errors.map( (e) => e.message)
//             return res.status(400).json(messages)
//         }
//         return next(err)
//     })
// })

router.delete('/records/:id', function(req, res, next){
    Record.destroy({where: {id: req.params.id}}).then( rowsModified => {
        return res.send('ok')
    }).catch( err => next(err)) //general catch block for errors, in case record doesn't exist, etc
})

module.exports = router