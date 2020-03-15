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
    const findOneConfirmationEmailStub = jest
      .spyOn(emailConfirmationModel, 'findOne')
      .mockImplementation(async () => ({ email: 'test@test.com.br' }))

    const findOneUserStub = jest
      .spyOn(userModel, 'findOne')
      .mockImplementation(async () => ({ email: 'test@test.com.br', verified: false }))

    const updateUserStub = jest
      .spyOn(userModel, 'update')
      .mockImplementation(async () => true)

    await request
      .get('/api/email/confirm')
      .query({ token: 'F4K3_T0K3N' })
      .expect(200, { message: 'O seu email foi verificado' })

    expect(findOneConfirmationEmailStub).toBeCalledWith({ where: { token: 'F4K3_T0K3N' } })
    expect(findOneUserStub).toBeCalledWith({ where: { email: 'test@test.com.br' } })
    expect(updateUserStub).toBeCalledWith({ verified: true }, { where: { email: 'test@test.com.br' } })
  })

  it('return 400 and confirmation token is not informed message', async () => {
    await request
      .get('/api/email/confirm')
      .expect(400, {
        errors: [{ message: 'Informe um token de confirmação válido', path: 'query.token' }]
      })
  })

  it('when query on db returns nothing, returns 400 and invalid token message', async () => {
    const findOneConfirmationEmailStub = jest
      .spyOn(emailConfirmationModel, 'findOne')
      .mockImplementation(async () => null)

    await request
      .get('/api/email/confirm')
      .query({ token: 'F4K3_T0K3N' })
      .expect(400, {
        errors: [{ message: 'Token de confirmação inválido ou expirado', path: 'query.token' }]
      })

    expect(findOneConfirmationEmailStub).toBeCalledWith({ where: { token: 'F4K3_T0K3N' } })
  })

  it('when query on db throws a error, returns 400 and invalid token message', async () => {
    const findOneConfirmationEmailStub = jest
      .spyOn(emailConfirmationModel, 'findOne')
      .mockRejectedValue('FAKE_ERROR')

    await request
      .get('/api/email/confirm')
      .query({ token: 'F4K3_T0K3N' })
      .expect(400, {
        errors: [{ message: 'Token de confirmação inválido ou expirado', path: 'query.token' }]
      })

    expect(findOneConfirmationEmailStub).toBeCalledWith({ where: { token: 'F4K3_T0K3N' } })
  })
})