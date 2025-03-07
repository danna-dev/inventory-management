<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Inventory Management API

## 📋 Prerequisites

- Nest
- Docker
- PostgreSQL
- Yarn

## 🚀 Getting Started

1. Install dependencies

```
 yarn install
```

3. Clone the file `.env.template` and rename it to `.env`
4. Change the environment variables values in `.env`
5. Create and run the containers

```
docker-compose -f docker-compose.prod.yaml up --build
```

## 🏗 Development Guide

### 📂 Migrations

1. Generate a new migration

```
NAME=CreateProductTable yarn typeorm:generate
```

2. Run migrations

```
yarn typeorm:run
```

3. Revert migrations

```
yarn typeorm:revert
```

### 🧪 Testing

1. Run tests

```
yarn test
```

2. Run tests with coverage

```
yarn test:cov
```

3. Run tests in watch mode

```
yarn test:watch
```

4. Open coverage report

```
 open coverage/lcov-report/index.html
```

### Api Documentation

The API documentation is available via Swagger.

Swagger UI: http://localhost:3000/api/docs
