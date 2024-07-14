import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

// Validation middleware for POST /signup endpoint
export const validateSignup = [
  body("firstName").notEmpty(),
  body("surname").notEmpty(),
  body("contact").notEmpty(),
  body("password").isLength({ min: 4 }),
  body("dob.day").notEmpty(),
  body("dob.month").notEmpty(),
  body("dob.year").notEmpty(),
  body("gender").notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
