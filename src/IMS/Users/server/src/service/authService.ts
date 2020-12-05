import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { User } from "../schema/user";
import {IUser} from "../model/user";

const router = express.Router();

router.post("/users/signin", async (req: Request, res: Response) => {
  const query = { userName: req.body.userName };
  User.findOne(query, async (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (user === null) {
      return res.status(401).send();
    } else {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign(
          user.toJSON(),
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: "1h" }
        );

        return res.json({
          id: user.id,
          userName: user.userName,
          roles: user.roles,
          accessToken: accessToken
        });
      } else {
        return res.status(401).send();
      }
    }
  });
});

router.post("/users/signup", async (req: Request, res: Response) => {
  const query = { userName: req.body.userName };
  User.findOne(query, async (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    if (user === null) {
      if (req.body.password !== req.body.repassword) {
        return res.status(400).send();
      } else {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
          id: uuidv4(),
          userName: req.body.userName,
          password: hashedPassword,
          roles: ["SUPPLIER"]
        });

        newUser.save((err) => {
          if (err) {
            console.log(err);
            return res.status(500).send();
          }

          return res.status(201).send();
        });
      }
    } else {
      return res.status(409).send();
    }
  });
});

router.get("/auth/supplier", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (token === undefined)
    return res.status(401).send();

  const params = token.split(' ');
  if (params.length != 2)
    return res.status(401).send();

  jwt.verify(
    params[1],
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (err, user) => {
      if (err) {
        return res.status(401).send();
      }

      if (!user) {
        return res.status(401).send();
      }

      if (!(user as IUser).roles.includes("SUPPLIER")) {
        return res.status(401).send();
      }

      return res.json(user).status(200).send();
    }
  );
});

router.get("/auth/manager", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (token === undefined)
    return res.status(401).send();

  const params = token.split(' ');
  if (params.length != 2)
    return res.status(401).send();

  jwt.verify(
    params[1],
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (err, user) => {
      if (err) {
        return res.status(401).send();
      }

      if (!user) {
        return res.status(401).send();
      }

      if (!(user as IUser).roles.includes("MANAGER")) {
        return res.status(401).send();
      }

      return res.json(user).status(200).send();
    }
  );
});

export default router;
