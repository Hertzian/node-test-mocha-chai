const express = require('express')
const app = express()
const utils = require('./utils/task-schema.js')
app.use(express.json())

const tasks = [
  { id: 1, name: 'Task 1', completed: false },
  { id: 2, name: 'Task 2', completed: false },
  { id: 3, name: 'Task 3', completed: false }
]

//@route   GET /
//@access  public
app.get('/', (req, res) => {
  console.log(tasks)
  res.send('It works!')
})

//@route   GET /api/tasks
//@access  public
app.get('/api/tasks', (req, res) => {
  res.send(tasks)
})

//@route   GET /api/tasks/:taskId
//@access  public
app.get('/api/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId
  const task = here(taskId)
  if (!task)
    return res.status(404).send('The task with the provided Id does not exists')
  res.send(task)
})

//@route   POST /api/tasks
//@access  public
app.post('/api/tasks', (req, res) => {
  const { error } = utils.validateTask(req.body)
  if (error)
    return res.status(400).send('The name should be al least 3 chars long')
  const task = {
    id: tasks.length + 1,
    name: req.body.name,
    completed: req.body.completed
  }
  tasks.push(task)
  res.status(201).send(task)
})

//@route   PUT /api/tasks/:taskId
//@access  public
app.put('/api/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId
  const task = here(taskId)
  if (!task)
    return res.status(404).send('The task with the provided Id does not exists')
  const { error } = utils.validateTask(req.body)
  if (error)
    return res.status(400).send('The name should be at least 3 chars long')
  task.name = req.body.name
  task.completed = req.body.completed
  res.send(task)
})

//@route   PATCH /api/tasks/:taskId
//@access  public
app.patch('/api/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId
  const task = here(taskId)
  if (!task)
    return res.status(404).send('The task with the provided Id does not exists')
  const { error } = utils.validateTask(req.body)
  if (error)
    return res.status(400).send('The name should be at least 3 chars long')
  task.name = req.body.name
  task.completed = task.completed || req.body.completed
  res.send(task)
})

//@route   DELETE /api/tasks:taskId
//@access  public
app.delete('/api/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId
  const task = here(taskId)
  if (!task)
    return res.status(404).send('The task with the provided Id does not exists')
  const index = tasks.indexOf(task)
  tasks.splice(index, 1)
  res.send(task)
})

const here = (taskId) => tasks.find((task) => task.id === parseInt(taskId))

const PORT = process.env.PORT || 5000
module.exports = app.listen(
  PORT,
  console.log(`server running on http://localhost:${PORT}`)
)
