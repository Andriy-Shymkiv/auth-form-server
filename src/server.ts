/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
const API_PATH = '/.netlify/functions/server';
const users: any[] = [];

app.use(cors());
app.use(express.json());

app.get(`${API_PATH}/users`, (req: Request, res: Response) => {
  res.send(users);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.post(`${API_PATH}/users`, async (req: Request, res: Response) => {
  try {
    const hasedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { login: req.body.login, password: hasedPassword };

    users.push(user);
    res.send(201);
  } catch {
    res.send(500);
  }
});

app.post(`${API_PATH}/users/login`, async (req: Request, res: Response) => {
  const particularUser = users.find(user => user.login === req.body.login);

  if (!particularUser) {
    res.sendStatus(400);

    return;
  }

  const insertedPassword
    = await bcrypt.compare(req.body.password, particularUser.password);

  try {
    if (insertedPassword) {
      res.send('Success');
    }

    if (!insertedPassword) {
      res.send('Not allowed');
    }
  } catch {
    res.status(500).send();
  }
});

// for local testing

const PORT = 5000 || null;

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
