const supertest = require('supertest')
const app = require('../../../src/app')
const userLib = require('../../../src/lib/user.lib')
const bcrypt = require('bcryptjs')

let server
let request

beforeEach(() => {
  server = app.listen()
  request = supertest(server)
})

afterEach(() => {
  server.close()
})

describe('POST on /api/login', () => {
  it('when all data is valid, should return 200 and authToken', async () => {
    const requestUser = {
      email: 'test@test.com.br',
      password: 'TestPassword123'
    }

    const getUserByEmailStub = jest
      .spyOn(userLib, 'getUserByEmail')
      .mockResolvedValue({
        email: 'test@test.com.br',
        verified: true,
        password: 'crypted_password'
      })

    const bcryptStub = jest
      .spyOn(bcrypt, 'compare')
      .mockResolvedValue(true)

    await request
      .post('/api/login')
      .send(requestUser)
      .expect(200, { message: 'Seja bem vindo!' })

    expect(getUserByEmailStub).toBeCalledWith(requestUser.email)
    expect(bcryptStub).toBeCalledWith(requestUser.password, 'crypted_password')
  })

  it('when all data is valid but email is not verified, should return 400 and error message', async () => {
    const requestUser = {
      email: 'test@test.com.br',
      password: 'TestPassword123'
    }

    const getUserByEmailStub = jest
      .spyOn(userLib, 'getUserByEmail')
      .mockResolvedValue({
        email: 'test@test.com.br',
        verified: false,
        password: 'crypted_password'
      })

    await request
      .post('/api/login')
      .send(requestUser)
      .expect(400, { message: 'Realize a verificação de email para realizar o login' })

    expect(getUserByEmailStub).toBeCalledWith(requestUser.email)
  })

  it('when all data is valid but password is incorrect, should return 400 and error message', async () => {
    const requestUser = {
      email: 'test@test.com.br',
      password: 'TestPassword123'
    }

    const getUserByEmailStub = jest
      .spyOn(userLib, 'getUserByEmail')
      .mockResolvedValue({
        email: 'test@test.com.br',
        verified: true,
        password: 'crypted_password'
      })

    const bcryptStub = jest
      .spyOn(bcrypt, 'compare')
      .mockResolvedValue(false)

    await request
      .post('/api/login')
      .send(requestUser)
      .expect(400, { message: 'Usuário ou senha incorretas' })

    expect(getUserByEmailStub).toBeCalledWith(requestUser.email)
    expect(bcryptStub).toBeCalledWith(requestUser.password, 'crypted_password')
  })

  it('when any data is invalid, should return 400 and error message', async () => {
    const requestUser = {
      email: 'invalidEmail',
      password: null
    }

    await request
      .post('/api/login')
      .send(requestUser)
      .expect(400, {
        errors:
          [{ message: 'Informe um email válido', path: 'body.email' },
          { message: 'Informe uma senha válida', path: 'body.password' }]
      })
  })

  it('when email is not associated with any account, should return 400 and error message', async () => {
    const requestUser = {
      email: 'test@test.com.br',
      password: 'TestPassword123'
    }

    const getUserByEmailStub = jest
      .spyOn(userLib, 'getUserByEmail')
      .mockResolvedValue(false)

    await request
      .post('/api/login')
      .send(requestUser)
      .expect(400, {
        errors:
          [{
            message: 'Este email não pertence a nenhuma conta',
            path: 'body.email'
          }]
      })

    expect(getUserByEmailStub).toBeCalledWith(requestUser.email)
  })
})