const supertest = require('supertest')
const app = require('../../../src/app')

let server
let request

beforeEach(() => {
  server = app.listen()
  request = supertest(server)
})

afterEach(() => {
  server.close()
})

describe('GET on /api/health', () => {
  it('return 200 and health true when API is healthy', async () => {
    await request
      .get('/api/health')
      .expect(200, { health: true })
  })
})