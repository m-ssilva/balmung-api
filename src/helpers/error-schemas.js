const errorSchemas = {
  'DEFAULT': {
    status: 500,
    body: {
      message: 'Ocorreu um erro inesperado'
    }
  },
  'NOT_VERIFIED': {
    status: 400,
    body: {
      message: 'Realize a verificação de e-mail para realizar o login'
    }
  },
  'INCORRECT_PASSWORD': {
    status: 400,
    body: {
      message: 'Usuário ou senha incorretas'
    }
  },
  'EMAIL_ALREADY_VERIFIED': {
    status: 400,
    body: {
      message: 'Esse e-mail já foi verificado'
    }
  },
  'EXPIRED_CONFIRMATION_TOKEN': {
    status: 400,
    body: {
      message: 'O código de confirmação de email expirou, solicite uma nova confirmação de email'
    }
  }
}

module.exports = errorSchemas