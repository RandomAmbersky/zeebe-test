const ZBClient = require('./ZBClient')

const gatewayAddress = 'localhost:26500'
const conf = {
  retry: true,
  maxRetries: 50,
  maxRetryTimeout: 5000
}

const zbc = new ZBClient(gatewayAddress, conf)

async function main () {
  zbc.connect()
  await zbc.topology()
}

main()
