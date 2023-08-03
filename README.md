
## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
## Endpoint

### Swagger

GET: `http://127.0.0.1:3001/api`

### Http

POST: `http://127.0.0.1:3001/api/auth/login`

GET: `http://127.0.0.1:3001/api/auth/profile`

GET: `http://127.0.0.1:3001/api/health/http`

GET: `http://127.0.0.1:3001/api/health/disk`

GET: `http://127.0.0.1:3001/api/health/memory`

### GraphQL

`http://127.0.0.1:3001/graphql`
```graphql
{
  recipe(id: "1") {
    id,
    title,
  }
}
```

### WebSocket

`ws://127.0.0.1:3001/ws`

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
