const { makeAmoRequest } = require('./amoRequest.js')

const createCompany = async (rawData, domain, access) => {
  const { name, address } = rawData
  const company = [
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
  return await makeAmoRequest(domain, 'companies', access, 'post', company).then(data => data._embedded.companies[0].id)
}

module.exports = { createCompany }