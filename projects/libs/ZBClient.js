const ZB = require('zeebe-node')
const { v4: uuidv4 } = require('uuid')

const _defaultConf = {
  retry: true,
  maxRetries: 50,
  maxRetryTimeout: 5000
}

module.exports = class ZBClient {
  constructor (gatewayAddress, conf) {
    this._gatewayAddress = gatewayAddress
    this._conf = Object.assign(_defaultConf, conf)
    this.logger = this._conf.stdout
  }

  connect () {
    this.zbc = new ZB.ZBClient(this._gatewayAddress, this._conf)
    // this.zbc.on('ready', () => {
    //   this.logger.info('onReady is worked')
    // })
  }

  async topology () {
    return this.zbc.topology()
  }

  async deployWorkflow (filepath) {
    return this.zbc.deployWorkflow(filepath)
  }

  async createWorker (taskType, taskHandler) {
    return this.zbc.createWorker(null, taskType, taskHandler)
    // worker.on('ready', () => {
    //   this.logger.info('Worker connected')
    // })
    // worker.on('connectionError', () => {
    //   this.logger.info('Worker disconnected!')
    // })
    // return worker
  }

  async createWorkflowInstance (taskType, intialPayload) {
    return this.zbc.createWorkflowInstance(taskType, intialPayload)
  }

  async publishStartMessage (payload) {
    return this.zbc.publishStartMessage(Object.assign({
      messageId: uuidv4()
    }, payload))
  }
}
