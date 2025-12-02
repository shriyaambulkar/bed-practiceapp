# Library API Practice App

This repo scaffolds a simple Express + MySQL API for a library system. 

## What's Included
- User CRUD endpoints are implemented.
- `npm run init_tables` recreates the schema and seeds sample data.

## Folder Structure
```
src
  configs/        createSchema.js, initTables.js
  controllers/    usersController.js, booksController.js, loansController.js
  models/         usersModel.js, booksModel.js, loansModel.js
  routes/         mainRoutes.js, usersRoutes.js, booksRoutes.js, loansRoutes.js
  services/       db.js
app.js
index.js
```

## Setup
1) Create `.env` in the project root if you want to override DB settings. Default MySQL config is in `src/services/db.js`.
2) Install deps: `npm install`
3) Initialize schema + seed data (4 users, 10 books, 25 loans): `npm run init_tables`
4) Start the server: `npm start` (or `npm run dev` with nodemon).

## Testing
1) Test with `npm run test`
