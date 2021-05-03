# Express, Prisma and Postgres

Repository for blog post: https://danethe.dev/articles/creating-a-restful-api-with-express-prisma-and-postgres

## Run Locally

Clone the project

```bash
git clone https://github.com/nulfrost/express-prisma-postgres.git
```

Go to the project directory

```bash
cd express-prisma-postgres
```

Install dependencies

```bash
npm install
```

To run this project, you will need to add the following environment variables to your .env file as well as start up a postgres database

```bash
DATABASE_URL="postgresql://<postgres username>:<postgres password>@localhost:5432/<database name>?schema=public
```

Run migrations

```bash
npx prisma migrate dev
```

Start the server

```bash
node index.js
```
