import * as mongoose from "mongoose";
import { IUser } from "../model/user";

export interface UserEntity extends IUser, mongoose.Document {}

let UserSchema = new mongoose.Schema({
  id: String,
  userName: String,
  password: String,
  roles: [String]
});

export var User = mongoose.model<UserEntity>("User", UserSchema, "users");
