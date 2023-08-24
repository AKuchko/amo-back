// import { create } from 'axios'
// import { config } from 'dotenv'

const { create } = require('axios')
const { config } = require('dotenv')

config()

const { DADATA_TOKEN } = process.env

const dadataInstance = create({
  baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party',
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Token " + DADATA_TOKEN
  }
})

module.exports = {
  get: dadataInstance.get,
  post: dadataInstance.post,
  delete: dadataInstance.delete,
  put: dadataInstance.put,
}