import React from "react";
import "./Landing.css";
import { Button, Container } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Landing = ({ history }) => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/myNotes");
    }
  }, [userInfo]);
  return (
    <div className="main">
      <Container>
        <div className="intro-text">
          <div>
            <h1 className="title">Welcome to Note Zipper</h1>
            <p className="subtitle">One Safe place for all your notes</p>
          </div>
          <div className="buttonContainer">
            <Link to="/login">
              <Button
                variant="contained"
                size="large"
                className="landingButton"
                color="error"
                endIcon={<LoginIcon fontSize="small" />}
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="contained"
                size="large"
                className="landingButton"
                color="error"
                endIcon={<FiberNewIcon fontSize="small" />}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Landing;
