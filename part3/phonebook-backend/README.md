# Phonebook Backend

This project contains a Full Stack Open phonebook backend with:

- Express API endpoints for `GET`, `POST`, `PUT`, and `DELETE`
- Morgan request logging with request-body logging for `POST` and `PUT`
- Optional MongoDB persistence through Mongoose
- A static frontend served by the backend at `http://localhost:3001`
- ESLint configuration

## Scripts

- `npm start` starts the backend on port `3001`
- `npm run dev` starts the backend with `nodemon`
- `npm run lint` runs ESLint

## Environment Variables

Copy `.env.example` to `.env` and set:

- `PORT`
- `MONGODB_URI`

If `MONGODB_URI` is not set, the app falls back to an in-memory phonebook so the earlier exercises still work locally.

## Mongo CLI

- `node mongo.js <password>` lists all entries
- `node mongo.js <password> "Ada Lovelace" 040-1234567` adds a new entry

If `.env` contains `MONGODB_URI`, `mongo.js` will use it directly.

## Deployment

Add your deployed URL here after pushing to Render or Fly:

- `https://your-app-url-here.onrender.com`
