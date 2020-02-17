const Koa = require('koa')

const {loadMiddleware} = require('./loader')

const ZBClient = require('../utils/ZBClient')

const logger = require('pino')({
  prettyPrint: {
    colorize: true
  }
})

const gatewayAddress = 'localhost:26500'

const conf = {
  loglevel: 'DEBUG',
  stdout: logger
}

class App extends Koa {
  constructor () {
    super()
    loadMiddleware(this)
    this.log = this.context.log = logger
    this.z = this.context.log = new ZBClient(gatewayAddress, conf)
  }

  async connect () {
    this.z.connect()
    this.log.info('KEKE')
  }
}

module.exports = App
