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
    const res = await ctx.z.deployWorkflow('./bpmn/order-process-message.bpmn')
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
  },
  'message': async function (ctx, next) {
    const res = await ctx.z.publishStartMessage({
        name: 'MESS-START-ORDER',
        variables: {
          projectId: 'd74a00a0-ece6-43b3-a321-97d51ac0d97d',
          authorization: 'Bearer 0e471cd0-f155-4499-b351-84e9774193c7',
          startDateTime: '2020-08-03T16:59:05+03:00'
        }
      }
    )
    ctx.status = 200
    ctx.body = res
    return next()
  }
}
