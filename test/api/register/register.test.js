const supertest = require('supertest')
const app = require('../../../src/app')
const userLib = require('../../../src/lib/user.lib')
const sendGrid = require('../../../src/lib/send-grid.lib')

let server
let request

beforeEach(() => {
  server = app.listen()
  request = supertest(server)
})

afterEach(() => {
  server.close()
})

describe('POST on /api/register', () => {
  it('when all data is valid, should return 201 and success message', async () => {
    const requestUser = {
      email: 'test@test.com.br',
      name: 'Test',
      password: 'TestPassword123'
    }

    const getUserByEmailStub = jest
      .spyOn(userLib, 'getUserByEmail')
      .mockResolvedValue(false)

    const createUserStub = jest
      .spyOn(userLib, 'createUser')
      .mockResolvedValue(true)

    const sendGridStub = jest
      .spyOn(sendGrid, 'sendConfirmationEmail')
      .mockResolvedValue(true)

    await request
      .post('/api/register')
      .send(requestUser)
      .expect(201, { message: 'User created' })

    expect(getUserByEmailStub).toBeCalledWith(requestUser.email)
    expect(createUserStub).toBeCalledWith(requestUser)
    expect(sendGridStub).toBeCalledWith(requestUser.email)
  })

  it('when any data is invalid, should return 400 and error message', async () => {
    const requestUser = {
      email: 'asdfasdf',
      name: null,
      password: null
    }

    await request
      .post('/api/register')
      .send(requestUser)
      .expect(400, {
        errors:
          [{ message: 'Informe um email válido', path: 'body.email' },
          { message: 'Informe uma senha válida', path: 'body.password' },
          { message: 'Informe um nome válido', path: 'body.name' }]
      })
  })

  it('when email already in use, should return 400 and already used email message', async () => {
    const requestUser = {
      email: 'test@test.com.br',
      name: 'Test',
      password: 'TestPassword123'
    }

    const getUserByEmailStub = jest
      .spyOn(userLib, 'getUserByEmail')
      .mockResolvedValue(true)

    await request
      .post('/api/register')
      .send(requestUser)
      .expect(400, { errors: [{ message: 'Email já está em uso', path: 'body.email' }] })
    expect(getUserByEmailStub).toBeCalledWith('test@test.com.br')
  })
})