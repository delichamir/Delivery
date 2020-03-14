# Simple Delivery application !

This is simple delivery application !
Technologies used: Typescript, Express, TypeORM, PostgreSQL .

## Instructions:

#### 1. Run database on docker:

    docker-compose up

#### 2. Run server with running migrations:

    npm run dev

#### 2. Create a new migration:

    typeorm migration:create -n NameOfMigration

#### 2. Revert last made migration:

    npm run revert
