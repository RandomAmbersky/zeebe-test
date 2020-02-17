const App = require('./App')
const app = new App()

async function main () {
  await app.connect()
  app.listen(8080, () => app.log.info(`Server is launched.`))
}

main()
