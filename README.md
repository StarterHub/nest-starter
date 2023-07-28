
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

Http: `http://127.0.0.1:3001/api/cats`

Swagger: `http://127.0.0.1:3001/api`

GraphQL: `http://127.0.0.1:3001/graphql`
```graphql
{
  recipe(id: "1") {
    id,
    title,
  }
}
```


WebSocket: `ws://127.0.0.1:3001/ws`

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
