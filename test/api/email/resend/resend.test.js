const supertest = require('supertest')
const app = require('../../../../src/app')
const emailConfirmationModel = require('../../../../src/models/email-confirmation.model')
const userModel = require('../../../../src/models/user.model')
const sendgrid = require('@sendgrid/mail')

let server
let request

beforeEach(() => {
  server = app.listen()
  request = supertest(server)
})

afterEach(() => {
  server.close()
})

describe('GET on /api/email/resend', () => {
  it('when email is not verified and is valid, returns 200 and success message', async () => {
    const findOneUserStub = jest
      .spyOn(userModel, 'findOne')
      .mockResolvedValue({ verified: false })

    const destroyConfirmationEmailStubß = jest
      .spyOn(emailConfirmationModel, 'destroy')
      .mockResolvedValue(true)

    const createConfirmationEmailStub = jest
      .spyOn(emailConfirmationModel, 'create')
      .mockResolvedValue(true)

    const sendGridStub = jest
      .spyOn(sendgrid, 'send')
      .mockResolvedValue(true)

    await request
      .get('/api/email/resend')
      .query({ email: 'test@test.com.br' })
      .expect(200, { message: 'Foi enviado um novo código de confirmação para o seu email' })

    expect(findOneUserStub).toBeCalledWith({ where: { email: 'test@test.com.br' } })
    expect(destroyConfirmationEmailStubß).toBeCalledWith({ where: { email: 'test@test.com.br' } })
    expect(createConfirmationEmailStub).toBeCalled()
    expect(sendGridStub).toBeCalledTimes(1)
  })
})