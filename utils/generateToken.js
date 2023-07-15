import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.Jwt_Secret, {
    expiresIn: "30d",
  });
};

export default generateToken;
