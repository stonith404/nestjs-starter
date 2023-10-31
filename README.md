# NestJS Starter

A NestJS starter project with the following features:

- CRUD operations with PrismaORM
- Seeding
- JWT and refresh token authentication
- Swagger API docs
- Dockerization

## API Docs

⚠️ _You first have to start the server, see [Setup](#development)._

The API docs are available at http://localhost:8080/docs.

The JSON version is available at http://localhost:8080/docs-json. This can be useful for e.g [Postman](https://www.postman.com/).

## Setup

### Development

#### Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/download/)

#### Steps

1. Clone the repository
2. Copy `.env.example` to `.env`
3. Install the dependencies
   ```bash
   npm install
   ```
4. Start the database
   ```bash
   docker-compose up -d db
   ```
5. Setup the database and seed it with data
   ```bash
   npm run resetAndSeedDb:dev
   ```
6. Start the server
   ```bash
   npm run start:dev
   ```