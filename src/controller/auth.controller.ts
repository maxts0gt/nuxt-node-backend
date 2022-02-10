import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import bcryptjs from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export const Register = async (req: Request, res: Response) => {
  const body = req.body;

  if (body.password !== body.password_confirm) {
    return res.status(400).send({ message: 'Passwords do not match' });
  }

  const { password, ...user } = await getRepository(User).save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcryptjs.hash(body.password, 10),
    is_ambassador: false,
  });
  res.send(user);
};

export const Login = async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send({ message: 'Invalid credentials' });
  }

  if (!(await bcryptjs.compare(req.body.password, user.password))) {
    return res.status(400).send({ message: 'Invalid credentials' });
  }

  const token = sign({ id: user.id }, process.env.SECRET_KEY);

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1day
  });

  res.send({ message: 'Success' });

  export const AuthenticatedUser = async (req: Request, res: Response) => {};
};
