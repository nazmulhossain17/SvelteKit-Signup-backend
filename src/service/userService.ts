import User, { UserDocument } from "../model/User";
import jwt from "jsonwebtoken";

interface CreateUserDTO {
  firstName: string;
  surname: string;
  emailOrMobile: string;
  password: string;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  gender: string;
}

interface LoginDTO {
  emailOrMobile: string;
  password: string;
}

export class UserService {
  async createUser(userDetails: CreateUserDTO): Promise<UserDocument> {
    const user = new User(userDetails);
    return await user.save();
  }

  async getUserByContact(emailOrMobile: string): Promise<UserDocument | null> {
    return await User.findOne({ emailOrMobile });
  }

  async loginUser({ emailOrMobile, password }: LoginDTO): Promise<string> {
    const user = await User.findOne({ emailOrMobile });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid email or mobile or password");
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return token;
  }
}
