module.exports = function (req, res, next) {
  const origin = req.get('Origin')
  req.originDomain = origin.split('://')[1]
  next()
}