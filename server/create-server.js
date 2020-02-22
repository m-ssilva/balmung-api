const app = require('../src/app')
const config = require('../configs')

app.listen(config.API.PORT, () => {
  console.log(`API listening on port ${config.API.PORT}`)
})