const axios = require('axios')

const GrantType = {
  AuthCode: 'authorization_code',
  RefreshToken: 'refresh_token',
}

const { SECRET_KEY, REDIRECT_URI } = process.env

const getAuth = async ({ token, type = GrantType.AuthCode, referer, client_id }) => {
  const { data } = await axios.post(
    `https://${referer}/oauth2/access_token`,
    {
      client_id,
      client_secret: SECRET_KEY,
      redirect_uri: REDIRECT_URI,
      grant_type: type,
      [type === GrantType.AuthCode ? 'code' : 'refresh_token']: token
    },
    {
      headers: {
        "Content-Type": 'application/json'
      }
    }
  )

  return data
}

module.exports = { getAuth }
