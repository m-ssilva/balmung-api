const get = async ctx => {
  ctx.status = 200
  ctx.body = { health: true }
}

module.exports = { get }