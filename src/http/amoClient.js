const { create } = require('axios')

const amoClient = create({
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  }
})

module.exports = { get: amoClient.get, post: amoClient.post }