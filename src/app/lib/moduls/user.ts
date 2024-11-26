import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "@/app/types/user";

const Users: Schema<IUser> = new Schema({
  userId: { type: String, required: true, unique: true },
  data: { type: [String], default: [] },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("user", Users);

export default User;
