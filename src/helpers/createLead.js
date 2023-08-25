const { makeAmoRequest } = require('./amoRequest.js')

const createLead = async (data, domain, accessToken) => {
  const { name, price, company } = data
  const endpoint = 'leads'
  const method = 'post'
  const body = [
    {
      name,
      price,
      _embedded: company.require ? { companies: [{ id: company.id }] } : {}
    }
  ]

  return await makeAmoRequest({ domain, endpoint, accessToken, method, body })
}

module.exports = { createLead }