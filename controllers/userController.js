import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import Users from "../model/userModel.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new Users({
      ...req.body,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not Found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(404, "Password incorrect"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.Jwt_Secret
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send({ ...otherDetails, token, isAdmin });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const UpdateUser = await Users.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(UpdateUser);
  } catch (error) {
    next(error);
  }
};
