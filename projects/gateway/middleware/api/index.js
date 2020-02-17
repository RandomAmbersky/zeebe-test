exports.get = {
  '/': [
    async function (ctx, next) {
      ctx.log.info('Get index')
      ctx.status = 200
      return next()
    }
  ],
  'topology': [
    async function (ctx, next) {
      const topology = await ctx.z.topology()
      ctx.status = 200
      ctx.body = topology
      return next()
    }
  ]
}
