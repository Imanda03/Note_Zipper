import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import { createError } from "../utils/error.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers;

      //decodes token id
      const decoded = jwt.verify(token, process.env.Jwt_Secret);

      req.user = await User.findById(decoded);

      next();
    } catch (error) {
      return next(createError(401, "Not authorized, token failed"));
    }
  }

  if (!token) {
    return next(createError(401, "Not authorized, no token"));
  }
});
