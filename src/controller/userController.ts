import { Request, Response } from "express";
import { UserService } from "../service/userService";

const userService = new UserService();

export class UserController {
  async signup(req: Request, res: Response): Promise<void> {
    const { firstName, surname, emailOrMobile, password, dateOfBirth, gender } =
      req.body;

    try {
      // Check if user already exists
      const existingUser = await userService.getUserByContact(emailOrMobile);
      if (existingUser) {
        res.status(400).json({ error: "User already exists" });
        return;
      }

      // Create new user
      const newUser = await userService.createUser({
        firstName,
        surname,
        emailOrMobile,
        password,
        dateOfBirth,
        gender,
      });

      // Respond with success message and user data
      res
        .status(201)
        .json({ message: "User signed up successfully", user: newUser });
    } catch (error) {
      console.error("Error signing up user", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { emailOrMobile, password } = req.body;
      const token = await userService.loginUser({ emailOrMobile, password });

      // Set token in a cookie (optional, adjust as per your authentication strategy)
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
        maxAge: 3600000, // 1 hour
      });

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Login error", error);
      res.status(401).json({ error: "Invalid credentials" });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    // Clear token cookie on logout
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  }
}
