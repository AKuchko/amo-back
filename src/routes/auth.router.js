const { Router } = require('express')
const { User } = require('../models')
const { getAuth } = require('../helpers/getAuth.js')

const authRouter = new Router()

authRouter.get('/verify_code', async (req, res) => {
  try {
    console.log(req.query);
    const { code, referer, client_id } = req.query
    const { access_token, refresh_token } = await getAuth({ token: code, referer, client_id })

    const user = await User.findOne({ domain: referer })

    if (user) {
      user.access = access_token
      user.refresh = refresh_token
      user.save()
    } else {
      await new User({
        access: access_token,
        refresh: refresh_token,
        domain: referer,
        clientId: client_id
      }).save()
    }

    res.status(200)
  } catch (error) {
    console.error(error)
  }
})

module.exports = authRouter