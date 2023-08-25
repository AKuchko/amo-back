const amoClient = require('../http/amoClient.js')

const makeAmoRequest = async (domain, endpoint, accessToken, method = 'get', body) => {
  // amoClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  const { data } = await amoClient[method](
    `https://${domain}/api/v4/${endpoint}`,
    body,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )
  return data
}

module.exports = { makeAmoRequest }