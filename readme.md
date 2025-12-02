# Library API Practice App

This repo scaffolds a simple Express + MySQL API for a library system. 

## What's Included
- User CRUD endpoints are implemented.
- Books and loans routes include recommend/search and loan flows for practice.
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

## Current Endpoints
- `POST /users` - create user (name, email, max_loans)
- `GET /users` - list users
- `GET /users/:id` - fetch one user
- `PUT /users/:id` - update user (name, email, max_loans)
- `DELETE /users/:id` - remove user
- `POST /books` - create a book
- `GET /books/recommend/:userId` - list books a user has never borrowed
- `GET /books/search` - search books by optional title/author/category/publishyear
- `POST /loans/new/:userId/:bookId` - create a loan (checks user allowance and book availability)
- `GET /loans/summary/:userId` - active/past loans for a user
