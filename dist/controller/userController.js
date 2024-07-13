"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../service/userService");
const userService = new userService_1.UserService();
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, surname, contact, password, dob, gender } = req.body;
            try {
                const existingUser = yield userService.getUserByContact(contact);
                if (existingUser) {
                    res.status(400).json({ error: "User already exists" });
                    return;
                }
                const newUser = yield userService.createUser({
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
            }
            catch (error) {
                console.error("Error signing up user", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { contact, password } = req.body;
                const token = yield userService.loginUser({ contact, password });
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
                    maxAge: 3600000, // 1 hour
                });
                res.status(200).json({ message: "Login successful" });
            }
            catch (error) {
                console.error("Login error", error);
                res.status(401).json({ error: "Invalid credentials" });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie("token");
            res.status(200).json({ message: "Logout successful" });
        });
    }
}
exports.UserController = UserController;
