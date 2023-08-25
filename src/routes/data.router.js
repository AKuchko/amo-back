const { Router } = require('express')
const dadataClient = require('../http/dadataClient.js')
const dataRouter = new Router()

dataRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { data } = await dadataClient.get('', { params: { query: id } })
    res.json(data.suggestions[0])
  } catch (error) {
    console.error(error.message)
    res.status(400)
  }
})

module.exports = dataRouter
