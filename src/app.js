import express from 'express'
import { getVisitor, getVisitors, registerVisitor } from './func/visitor.js'

const app = express()
const port = 8888

app.use(express.json())

//#region Visitor

app.get('/visitors', async (req, res) => {
  res.status(200).send(await getVisitors())
})

app.get('/visitor', async (req, res) => {
  const { name, phone } = req.body
  res.status(200).send(await getVisitor({ name, phone }))
})

app.get('/visitor/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id)
  res.status(200).send(await getVisitor({ id }))
})

app.post('/visitor', async (req, res) => {
  const { name, phone } = req.body
  res.status(201).send(await registerVisitor(name, phone))
})

//#endregion

//#region Delivery

//#endregion

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
