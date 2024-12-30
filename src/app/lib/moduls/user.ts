// import mongoose, { Model, Schema } from "mongoose";
// import { IUser } from "@/app/types/user";

// const Users: Schema<IUser> = new Schema({
//   userId: { type: String, required: true, unique: true },
//   data: { type: [String], default: [] },
// });

// const User: Model<IUser> =
//   mongoose.models.User || mongoose.model<IUser>("user", Users);

// export default User;




import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "@/app/types/user";
// const userSchema = new mongoose.Schema({

  const userSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  // role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});



const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;




