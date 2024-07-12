import User from "../model/User";

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

export class UserService {
  async createUser(userDetails: CreateUserDTO) {
    const user = new User(userDetails);
    return await user.save();
  }

  async getUserByContact(contact: string) {
    return await User.findOne({ contact });
  }
}
