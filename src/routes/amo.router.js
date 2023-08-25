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
    const company = await makeAmoRequest({
      domain,
      accessToken: access,
      endpoint: 'companies',
    }).then(res => res._embedded.companies.filter(comp => comp.name === body.company.name)[0])

    if (!company) body.company.id = await createCompany(body.company, domain, access)
    else body.company.id = company.id

    const leadData = await createLead(body, domain, access)

    res.status(201).json(leadData)
  } catch (error) {
    console.log(error);
    res.json(error)
  }
})

module.exports = amoRouter