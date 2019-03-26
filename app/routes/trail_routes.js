const express = require('express')
const passport = require('passport')

const Nurse = require('../models/nurse')

const handle = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.post('/nurse', requireToken, (req, res) => {
    req.body.trail.owner = req.user.id

    Nurse.create(req.body.trail)
        .then(trail => {
            res.status(201).json({ nurse: nurse.toObject() })
        })
        .catch(err => handle(err, res))
})

router.delete('/nurse/:id', requireToken, (req, res) => {
    Nurse.findById(req.params.id)
        .then(handle404)
        .then(nurse => {
            requireOwnership(req, nurse)
            nurse.remove()
        })
        .then(() => res.sendStatus(204))
        .catch(err => handle(err, res))
})

router.get('/nurse', requireToken, (req, res) => {
    Nurse.find({ owner: req.user.id })
        .then(nurse => {
            return nurse.map(nurse => nurse.toObject())
        })
        .then(nurse => res.status(200).json({ nurse: nurse }))
        .catch(err => handle(err, res))
})

router.get('/nurse/:id', requireToken, (req, res) => {
    Nurse.findById(req.params.id)
        .then(handle404)
        .then(nurse => res.status(200).json({ nurse: nurse.toObject() }))
        .catch(err => handle(err, res))
})

router.patch('/nurse/:id', requireToken, (req, res) => {
    delete req.body.nurse.owner
    Nurse.findById(req.params.id)
        .then(handle404)
        .then(nurse => {
            requireOwnership(req, nurse)

            Object.keys(req.body.nurse).forEach(key => {
                if (req.body.nurse[key] === '') {
                    delete req.body.nurse[key]
                }
            })

            return nurse.update(req.body.nurse)
        })
        .then(nurse => res.sendStatus(204))
        .catch(err => handle(err, res))
})

module.exports = router
