import { Request, Response } from "express";
import { UserService } from "../service/userService";

const userService = new UserService();

export class UserController {
  async signup(req: Request, res: Response): Promise<void> {
    const { firstName, surname, contact, password, dob, gender } = req.body;

    try {
      const existingUser = await userService.getUserByContact(contact);
      if (existingUser) {
        res.status(400).json({ error: "User already exists" });
        return;
      }

      const newUser = await userService.createUser({
        firstName,
        surname,
        contact,
        password,
        dob,
        gender,
      });
      res
        .status(201)
        .json({ message: "User signed up successfully", user: newUser });
    } catch (error) {
      console.error("Error signing up user", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
