const axios = require('axios')

const GrantType = {
  AuthCode: 'authorization_code',
  RefreshToken: 'refresh_token',
}

const { SECRET_KEY } = process.env

const getAuth = async ({ token, type = GrantType.AuthCode, referer, client_id }) => {
  const { data } = await axios.post(
    `https://${referer}/oauth2/access_token`,
    {
      client_id,
      client_secret: SECRET_KEY,
      redirect_uri: 'https://0b1c-92-126-119-3.ngrok-free.app/auth/verify_code',
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