import User, { UserDocument } from "../model/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface CreateUserDTO {
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
}

interface LoginDTO {
  contact: string;
  password: string;
}

export class UserService {
  async createUser(userDetails: CreateUserDTO): Promise<UserDocument> {
    const user = new User(userDetails);
    return await user.save();
  }

  async getUserByContact(contact: string): Promise<UserDocument | null> {
    return await User.findOne({ contact });
  }

  async loginUser({
    contact,
    password,
  }: {
    contact: string;
    password: string;
  }): Promise<string> {
    const user = await User.findOne({ contact });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid contact or password");
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return token;
  }
}
