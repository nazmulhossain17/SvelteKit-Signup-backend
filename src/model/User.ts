import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  firstName: string;
  surname: string;
  contact: string;
  password: string;
  dob: {
    day: string;
    month: string;
    year: string;
  };
  gender: string;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  contact: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: {
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
  },
  gender: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
