const { makeAmoRequest } = require('./amoRequest.js')

const createCompany = async (rawData, domain, accessToken) => {
  const { name, address } = rawData
  const endpoint = 'companies'
  const method = 'post'
  const body = [
    {
      name,
      custom_fields_values: [
        {
          field_code: "ADDRESS",
          values: [{ value: address }],
        },
      ]
    }
  ]
  const { _embedded } = await makeAmoRequest({ domain, endpoint, accessToken, method, body })
  
  return _embedded.companies[0].id
}

module.exports = { createCompany }