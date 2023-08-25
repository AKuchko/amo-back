const { Router } = require('express')
const { User } = require('../models')
const { makeAmoRequest } = require('../helpers/amoRequest.js')
const { createCompany } = require('../helpers/createCompany.js')
const { createLead } = require('../helpers/createLead.js')
const amoMiddleware = require('../middleware/amo.middleware.js')

const amoRouter = new Router()

amoRouter.use(amoMiddleware)

amoRouter.post('/createLead', async (req, res) => {
  try {
    const domain = req.originDomain
    const { body } = req
    const { access } = await User.findOne({ domain })
    body.company.id = await createCompany(body.company, domain, access)
    const leadData = await createLead(body, domain, access)

    res.status(201).json(leadData.data)
  } catch (error) {
    console.log(error);
  }
})

module.exports = amoRouter