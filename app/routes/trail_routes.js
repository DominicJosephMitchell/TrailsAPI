const express = require('express')
const passport = require('passport')

const Trail = require('../models/trail')

const handle = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.post('/trails', requireToken, (req, res) => {
    req.body.trail.owner = req.user.id

    Trail.create(req.body.trail)
        .then(trail => {
            res.status(201).json({ trail: trail.toObject() })
        })
        .catch(err => handle(err, res))
})

router.delete('/trails/:id', requireToken, (req, res) => {
    Trail.findById(req.params.id)
        .then(handle404)
        .then(trail => {
            requireOwnership(req, trail)
            trail.remove()
        })
        .then(() => res.sendStatus(204))
        .catch(err => handle(err, res))
})

router.get('/trails', requireToken, (req, res) => {
    Trail.find({ owner: req.user.id })
        .then(trails => {
            return trails.map(trail => trail.toObject())
        })
        .then(trails => res.status(200).json({ trails: trails }))
        .catch(err => handle(err, res))
})

router.get('/trails/:id', requireToken, (req, res) => {
    Trail.findById(req.params.id)
        .then(handle404)
        .then(trail => res.status(200).json({ trail: trail.toObject() }))
        .catch(err => handle(err, res))
})

router.patch('/trails/:id', requireToken, (req, res) => {
    delete req.body.trail.owner
    Trail.findById(req.params.id)
        .then(handle404)
        .then(trail => {
            requireOwnership(req, trail)

            Object.keys(req.body.trail).forEach(key => {
                if (req.body.trail[key] === '') {
                    delete req.body.trail[key]
                }
            })

            return trail.update(req.body.trail)
        })
        .then(trail => res.sendStatus(204))
        .catch(err => handle(err, res))
})

module.exports = router
