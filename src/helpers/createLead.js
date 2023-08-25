const { makeAmoRequest } = require('./amoRequest.js')

const createLead = async (data, domain, access) => {
  const { name, price, company } = data

  const lead = [
    {
      name,
      price,
      _embedded: {
        companies: [{ id: company.id }]
      }
    }
  ]

  return await makeAmoRequest(domain, 'leads', access, 'post', lead)
}

module.exports = { createLead }