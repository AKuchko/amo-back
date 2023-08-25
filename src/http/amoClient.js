const { create } = require('axios')
const { getAuth } = require('../helpers/getAuth')
const { User } = require('../models')

const amoClient = create({
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  }
})

amoClient.interceptors.response.use(response => response, async error => {
  const status = error.response.status
  const domain = error.request.host

  if (status === 401) {
    const user = await User.findOne({ domain })

    const { access_token, refresh_token } = await getAuth({
      token: user.refresh,
      type: 'refresh_token',
      referer: domain,
      client_id: user.clientId
    })

    user.access = access_token
    user.refresh = refresh_token
    await user.save()

    error.config.headers['Authorization'] = `Bearer ${access_token}`
    return amoClient.request(error.config)
  }

  return Promise.reject(error)
})

module.exports = { get: amoClient.get, post: amoClient.post }