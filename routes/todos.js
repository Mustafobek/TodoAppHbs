const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')

router.get('/', async (req, res) => {

    const todos = await Todo.find({}).lean()

    res.render('index', {
        title: 'TodoApp',
        isIndex: true,
        todos
    })
})


router.get('/create', (req, res) => {
    res.render('create', {
        title: "Create your todo",
        isCreate: true
    })
})


router.post('/create', async (req, res) => {
    const todo = new Todo({
        name: req.body.name
    })

    await todo.save()
    res.redirect('/')
})


router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed
    await todo.save()
    res.redirect('/')
})

module.exports = router