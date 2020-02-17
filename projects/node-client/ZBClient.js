const ZB = require('zeebe-node')

const _defaultConf = {
  retry: true,
  maxRetries: 50,
  maxRetryTimeout: 5000
  // onReady: () => console.log(`Connected!`),
  // onConnectionError: () => console.log(`Disconnected!`)
}

module.exports = class ZBClient {
  constructor (gatewayAddress, conf) {
    this._gatewayAddress = gatewayAddress
    this._conf = Object.assign(_defaultConf, conf)
    this.logger = this._conf.stdout
  }

  connect () {
    this.zbc = new ZB.ZBClient(this._gatewayAddress, this._conf)
    this.zbc.on('ready', () => {
      this.logger.info('onReady is worked')
    })
  }

  async topology () {
    const topology = await this.zbc.topology()
    this.logger.info('topology: %O', JSON.stringify(topology, null, 2))
  }

  async deployWorkflow (filepath) {
    const res = await this.zbc.deployWorkflow(filepath)
    this.logger.info('deployWorkflow: %O', res)
  }
}
