# Users API

A powerful REST API developed with Node.js, Express.js, and TypeScript, designed to manage users with full CRUD functionality.

- Full CRUD operations for managing user resources
- Data persistence using PostgreSQL
- RESTful API architecture
- Comprehensive Swagger documentation

## 🧩 Tech Stack

- Node.js
- Express.js
- TypeScript
- Drizzle ORM
- PostgreSQL
- Zod
- Swagger

## 🚨 Prerequisites

Make sure that these tools are already installed on your local machine:

- Node.js
- npm (Node Package Manager)
- Docker
- PostgreSQL

## ⚡ Launch the project

1. Clone this repository https://github.com/khoatruong19/BE-TruongHuynhDangKhoa
2. cd `./src/problem5`
3. Run `npm install` to install all packages
4. Run `npm run dev:docker` to run the project in **Docker** containers.
   ⚠️ **Alternatively**, if you prefer not to use **Docker**, you can set up the project with your local database. First, create a `.env` file based on `.env.example`. Then, run:
   `npm run db:migrate` to initialize the tables, followed by:
   `npm run dev` to start the project.

🎯 Run `npm run db:seed` to seed fake data

🚀 **Deployed project:** https://be-truonghuynhdangkhoa-problem5.onrender.com/v1/docs

## 🔥 API Description

### Endpoints

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| GET    | /v1/users     | Get all users with filters |
| GET    | /v1/users/:id | Get user details by ID     |
| POST   | /v1/users     | Create a new user          |
| PATCH  | /v1/users/:id | Update user details        |
| DELETE | /v1/users/:id | Delete a user              |

### Query Parameters for GET v1/users

| Parameter | Description                         | Example            |
| --------- | ----------------------------------- | ------------------ |
| limit     | Max number of users to be returned  | `?limit=10`        |
| offset    | Skips a certain number of results   | `?offset=0`        |
| is_active | Filter users by their active status | `?is_active=false` |
| orderBy   | Field to sort by (any table column) | `?order_by=email`  |
| sort      | Sorting order ('asc' or 'desc')     | `?sort=asc`        |

### Playground

Explore the **Swagger** documentation here: https://be-truonghuynhdangkhoa-problem5.onrender.com/v1/docs

## 🐳 Project Structure

```
problem5/
├── migrations/       # Database migration scripts
├── src/
│   ├── modules/	  # Entity modules
│   │   └── users/
│   │       ├── users.controller.ts  # User request handling
│   │       ├── users.message.ts     # User-related messages
│   │       ├── users.repository.ts # User data access
│   │       ├── users.router.ts     # User route definitions
│   │       ├── users.schema.ts     # User data schema
│   │       └── users.service.ts    # User business logic
│   ├── store/         # Data storage (database, cache)
|	|   ├── db/		   # Database setup
|	|       ├── migrate.ts   # Database migration script
|	|       ├── schema.ts    # Database schema (Drizzle ORM)
|	|       ├── seed.ts      # Database seeding script
|	|       ├── setup.ts     # Database connection setup
|	|   └── index.ts     # Store setup
│   └── utils/
│   |   ├── config.ts     # Configuration loader
│   |   ├── errors.ts     # Custom error definitions
│   |   ├── helpers.ts    # Helper functions
│   |   ├── logger.ts     # Logger configuration
│   |   ├── middlewares.ts # Request processing middlewares
│   |   ├── response.ts   # API response formatting
│   |   ├── server.ts     # Server setup
│   |   ├── swagger.ts    # Swagger/OpenAPI config
│   └── main.ts       # Application entry point
└── .env.example   # Environment variables template
├── docker-compose.dev.yml # Docker Compose for development
├── Dockerfile         # Docker image build instructions
├── drizzle.config.ts # Drizzle ORM configuration
├── package.json       # Project configuration and dependencies
└── tsconfig.json      # TypeScript configuration
```
