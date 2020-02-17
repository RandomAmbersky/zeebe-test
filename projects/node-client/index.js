const logger = require('pino')({
  prettyPrint: true
})

const ZBClient = require('./ZBClient')

const gatewayAddress = 'localhost:26500'
const conf = {
  loglevel: 'DEBUG',
  stdout: logger
}

const zbc = new ZBClient(gatewayAddress, conf)

async function main () {
  zbc.connect()
  await zbc.topology()
  // await zbc.deployWorkflow('./bpmn/order-process.bpmn')
}

main()
