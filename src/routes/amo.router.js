const { Router } = require('express')
const { amoClient } = require('../http/amoClient')
const amoMiddleware = require('../middleware/amo.middleware.js')
const { User } = require('../models')

const amoRouter = new Router()

amoRouter.use(amoMiddleware)

amoRouter.get('/leads', async (req, res) => {
  try {
    // console.log(req.get('Origin'));
    const domain = req.originDomain
    const { access } = await User.findOne({ domain })
    amoClient.defaults.headers.common['Authorization'] = `Bearer ${access}`
    const {data} = await amoClient.get(`https://${domain}/api/v4/leads`)
    console.log(data);

    // const data = await amoClient.get('')
  } catch (error) {
    
  }
})

module.exports = amoRouter