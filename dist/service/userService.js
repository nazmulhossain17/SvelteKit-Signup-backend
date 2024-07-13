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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = __importDefault(require("../model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
class UserService {
    createUser(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.default(userDetails);
            return yield user.save();
        });
    }
    getUserByContact(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOne({ contact });
        });
    }
    loginUser({ contact, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ contact });
            if (!user || !(yield user.comparePassword(password))) {
                throw new Error("Invalid contact or password");
            }
            // Create a JWT token
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            return token;
        });
    }
}
exports.UserService = UserService;
