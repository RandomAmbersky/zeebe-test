const Koa = require('koa')

const {loadMiddleware} = require('./loader')

const ZBClient = require('../utils/ZBClient')

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
  loglevel: 'DEBUG',
  stdout: zLogger
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
    this.log.info('connect()')
  }
}

module.exports = App
