import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "@/app/types/user";

  const userSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  image: { type: String, required: false },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
