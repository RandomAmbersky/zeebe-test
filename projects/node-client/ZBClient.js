const ZB = require('zeebe-node')

module.exports = class ZBClient {
  constructor (gatewayAddress, conf) {
    this._gatewayAddress = gatewayAddress
    this._conf = conf
  }

  connect () {
    this.zbc = new ZB.ZBClient(this._gatewayAddress, this._conf)
  }

  async topology () {
    const topology = await this.zbc.topology()
    console.log(JSON.stringify(topology, null, 2))
  }
}
