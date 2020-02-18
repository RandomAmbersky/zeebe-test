const Koa = require('koa')

const {loadMiddleware} = require('./loader')

const ZBClient = require('../libs/ZBClient')

const logger = require('pino')({
  prettyPrint: {
    colorize: true
  }
})

const zLogger = logger.child({
  zeebe: '1'
})

const gatewayAddress = 'localhost:26500'
const conf = {
  // loglevel: 'DEBUG',
  stdout: zLogger
}

const handlerPaymentService = (job, complete) => {
  // const { payload } = job.payload
  logger.info('handlerPaymentService: %o', job)
  const updatedPayload = {
    payment: 'ok'
  }
  complete.success(updatedPayload)
}

const handlerInventoryService = (job, complete) => {
  logger.info('handlerInventoryService: %o', job)
  const updatedPayload = {
    inventory: 'ok'
  }
  complete.success(updatedPayload)
}

const handlerShipmentService = (job, complete) => {
  logger.info('handlerShipmentService: %o', job)
  const updatedPayload = {
    shipment: 'ok'
  }
  complete.success(updatedPayload)
}

class App extends Koa {
  constructor () {
    super()
    loadMiddleware(this)
    this.log = this.context.log = logger
    this.z = this.context.z = new ZBClient(gatewayAddress, conf)
  }

  async connect () {
    this.z.connect()
    this._createWorkers()
    this.log.info('connect()')
  }

  _createWorkers () {
    const resp1 = this.z.createWorker('payment-service', handlerPaymentService)
    this.log.info(resp1)
    const resp2 = this.z.createWorker('inventory-service', handlerInventoryService)
    this.log.info(resp2)
    const resp3 = this.z.createWorker('shipment-service', handlerShipmentService)
    this.log.info(resp3)
  }
}

module.exports = App
