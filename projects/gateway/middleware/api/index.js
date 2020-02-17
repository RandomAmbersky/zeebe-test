exports.get = {
  '/': [
    async function (ctx, next) {
      ctx.log.info('Get index')
      ctx.status = 200
      return next()
    }
  ],
  'topology': [
    function (ctx, next) {
      ctx.log.info('Get api1')
      ctx.status = 200
      return next()
    }
  ]
}
