import 'dotenv/config';
import pg from 'pg';
import argon2 from 'argon2';
import express from 'express';
import jwt from 'jsonwebtoken';
import { ClientError, errorMiddleware, authMiddleware } from './lib/index.js';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'Please enter both a username and password.');
    }
    const hash = await argon2.hash(password);
    const sql = `
      insert into "Users" ("username", "hashPassword")
      values ($1, $2)
      returning "userId", "username", "createdAt";
      `;
    const params = [username, hash];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }

    const sql = `
    select "userId",
           "hashPassword"
    from "Users"
    where "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'Invalid login');
    }
    const { userId, hashPassword } = user;
    // const matchedPasswords = await argon2.verify(hashPassword, password);

    // if (!matchedPasswords) {
    if (!hashPassword) {
      throw new ClientError(401, 'Invalid login');
    }

    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);

    res.status(200).json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.get('/api/cats', authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.user;
    const sql = `
      select * from "Cats"
        where "userId" = $1
        order by "catId" desc;
    `;
    const params = [userId];
    const result = await db.query(sql, params);
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/cats/:catId', authMiddleware, async (req, res, next) => {
  try {
    const id = Number(req.params.catId);
    if (Number.isNaN(id) || !Number.isInteger(id) || id < 0) {
      throw new ClientError(
        404,
        'Invalid id. The id should be a positive integer.'
      );
    }
    const userId = req.user.userId;
    const sql = `
      SELECT "name", "gender", "ageYr", "ageMo", "photoUrl", "breed"
      FROM "Cats"
      WHERE "catId" = $1 AND "userId" = $2;
    `;
    const params = [id, userId];
    const result = await db.query(sql, params);
    const singleCat = result.rows[0];

    if (singleCat) {
      return res.status(200).json(singleCat);
    } else {
      throw new ClientError(404, `Cannot find cat with id ${id}.`);
    }
  } catch (err) {
    next(err);
  }
});

app.post('/api/cats', authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { name, gender, ageYr, ageMo, breed, photoUrl } = req.body;
    if (!name || !gender || !ageYr || !ageMo || !breed || !photoUrl) {
      throw new ClientError(
        400,
        'name, gender, age, breed and photoUrl are required fields'
      );
    }
    if (isNaN(ageMo) || ageMo < 0 || ageMo > 11) {
      throw new ClientError(400, 'Months must be a number between 0 and 11.');
    }
    if (isNaN(ageYr) || ageYr < 0 || ageYr > 25) {
      throw new ClientError(400, 'Years must be a number between 0 and 25.');
    }
    const sql = `
      insert into "Cats" ("name", "gender", "ageYr", "ageMo", "photoUrl", "breed", "userId")
        values ($1, $2, $3, $4, $5, $6, $7)
        returning *;
    `;
    const params = [name, gender, ageYr, ageMo, photoUrl, breed, userId];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

app.put('/api/cats/:catId', authMiddleware, async (req, res, next) => {
  try {
    const id = Number(req.params.catId);
    const { name, gender, ageYr, ageMo, photoUrl, breed } = req.body;
    if (!name || !gender || !ageYr || !ageMo || !photoUrl || !breed) {
      throw new ClientError(
        400,
        'name, gender, age, photoUrl and breed are required fields'
      );
    }
    if (isNaN(ageMo) || ageMo < 0 || ageMo > 11) {
      throw new ClientError(400, 'Months must be a number between 0 and 11.');
    }
    if (isNaN(ageYr) || ageYr < 0 || ageYr > 25) {
      throw new ClientError(400, 'Years must be a number between 0 and 25.');
    }
    if (!Number.isInteger(id)) {
      throw new ClientError(400, 'catId must be an integer');
    }
    const sql = `
      update "Cats"
        set "name" = $1,
            "gender" = $2,
            "ageYr" = $3,
            "ageMo" = $4,
            "photoUrl" = $5,
            "breed" = $6
        where "catId" = $7 and "userId" = $8
        returning *;
    `;
    const params = [
      name,
      gender,
      ageYr,
      ageMo,
      photoUrl,
      breed,
      id,
      req.user.userId,
    ];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    if (!entry) {
      throw new ClientError(404, `Cat with id ${id} not found`);
    }
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/cats/:catId', async (req, res, next) => {
  try {
    const catId = Number(req.params.catId);
    if (!Number.isInteger(catId)) {
      throw new ClientError(400, 'catId must be an integer');
    }
    const sql = `
      delete from "Cats"
        where "catId" = $1 and "userId" = $2
        returning *;
    `;
    const params = [catId, req.user.userId];
    const result = await db.query(sql, params);
    const [deleted] = result.rows;
    if (!deleted) {
      throw new ClientError(404, `Cat with id ${catId} not found`);
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
