# balmung-api

## Introduction

The Balmung brings simple functionality in APIs made in NodeJS, but implemented using modern dependencies.

Below is a list of features available in Balmung-API:

- API health check.
- Registration of users in a database defined in the API configuration.
- Login system using the credentials registered at the registration endpoint.
- Email confirmation system using SendGrid.

## Project folder structure

```
.
├── configs                 # Configuration files of api and database
├── server                  # initialization files
├── src                     # Source files
│    ├── helpers            # Helpers files, database connection, dynamic route register, etc
│    ├── lib                # Lib files, layer responsible for integrating with external databases or services
│    ├── middlewares        # Middlewares files
│    ├── models             # Database models files
│    ├── routes             # Route and validators files
│    ├── services           # Service files, layer responsible for validating business rules and returning status codes to the client
├── test                    # Automated tests (alternatively `spec` or `tests`)
└── README.md
```