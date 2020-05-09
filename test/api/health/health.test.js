const supertest = require('supertest')
const app = require('../../../src/app')
const { sequelize } = require('../../../src/models')

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
  it('return 200 and api and database true when API and database is healthy', async () => {
    jest
      .spyOn(sequelize, 'authenticate')
      .mockResolvedValue()

    await request
      .get('/api/health')
      .expect(200, { api: true, database: true })
  })

  it('return 200 and api true and database false when API is healthy and database is returning error', async () => {
    jest
      .spyOn(sequelize, 'authenticate')
      .mockRejectedValue()

    await request
      .get('/api/health')
      .expect(200, { api: true, database: false })
  })
})