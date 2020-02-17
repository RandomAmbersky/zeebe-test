exports.get = {
  '/': async function (ctx, next) {
    ctx.log.info('Get index')
    ctx.status = 200
    return next()
  },
  'topology': async function (ctx, next) {
    const topology = await ctx.z.topology()
    ctx.status = 200
    ctx.body = topology
    return next()
  },
  'deploy': async function (ctx, next) {
    const res = await ctx.z.deployWorkflow('./bpmn/order-process.bpmn')
    ctx.status = 200
    ctx.body = res
    return next()
  },
  'instance': async function (ctx, next) {
    const res = await ctx.z.createWorkflowInstance('order-process', {
      testData: 'something'
    })
    ctx.status = 200
    ctx.body = res
    return next()
  }
}
