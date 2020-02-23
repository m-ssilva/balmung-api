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
      message: 'Realize a verificação de email para realizar o login'
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
      message: 'Esse email já foi verificado'
    }
  },
  'EXPIRED_CONFIRMATION_TOKEN': {
    status: 400,
    body: {
      message: 'O código de confirmação de email expirou, solicite uma nova confirmação de email'
    }
  },
  'EMAIL_NOT_REGISTERED': {
    status: 400,
    body: {
      message: 'Esse email não pertence a nenhuma conta registrada'
    }
  }
}

module.exports = errorSchemas