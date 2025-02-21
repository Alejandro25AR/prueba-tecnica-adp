import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: String,
  password: String,
  role: String,
  mustChangePassword: Boolean,
  inscriptionDate: Date
},{collection: 'Users'});

export const UserModel = mongoose.model("Users", userSchema);