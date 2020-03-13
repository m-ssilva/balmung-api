const supertest = require('supertest')
const app = require('../../../../src/app')
const emailConfirmationModel = require('../../../../src/models/email-confirmation.model')
const userModel = require('../../../../src/models/user.model')

let server
let request

beforeEach(() => {
  server = app.listen()
  request = supertest(server)
})

afterEach(() => {
  server.close()
})

describe('GET on /api/email/confirm', () => {
  it('return 200 and email verified message', async () => {
    jest
      .spyOn(emailConfirmationModel, 'findOne')
      .mockImplementation(() => ({ email: 'test@test.com.br' }))

    jest
      .spyOn(userModel, 'findOne')
      .mockImplementation(() => ({ email: 'test@test.com.br', verified: false }))

    jest
      .spyOn(userModel, 'update')
      .mockImplementation(() => true)

    await request
      .get('/api/email/confirm')
      .query({ token: 'F4K3_T0K3N' })
      .expect(200, { message: 'O seu email foi verificado' })
  })

  it('return 400 and confirmation token is not informed message', async () => {
    await request
      .get('/api/email/confirm')
      .expect(400, {
        errors: [
          {
            message: 'Informe um token de confirmação válido',
            path: 'query.token'
          }
        ]
      }
      )
  })

  it('return 400 and invalid token message', async () => {
    jest
      .spyOn(emailConfirmationModel, 'findOne')
      .mockImplementation(() => false)

    await request
      .get('/api/email/confirm')
      .query({ token: 'F4K3_T0K3N' })
      .expect(400, {
        errors: [
          {
            message: 'Token de confirmação inválido ou expirado',
            path: 'query.token'
          }
        ]
      }
      )
  })

  it('return 400 and invalid token message', async () => {
    jest
      .spyOn(emailConfirmationModel, 'findOne')
      .mockImplementation(() => Error('FAKE_ERROR'))

    await request
      .get('/api/email/confirm')
      .query({ token: 'F4K3_T0K3N' })
      .expect(400, {
        errors: [
          {
            message: 'Token de confirmação inválido ou expirado',
            path: 'query.token'
          }
        ]
      }
      )
  })
})