// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  IDNumber: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  residentialArea: { type: String, required: true },
  sourceOfIncome: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

export default User;
