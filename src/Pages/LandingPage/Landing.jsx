import React from "react";
import "./Landing.css";
import { Button, Container } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import FiberNewIcon from "@mui/icons-material/FiberNew";

const Landing = () => {
  return (
    <div className="main">
      <Container>
        <div className="intro-text">
          <div>
            <h1 className="title">Welcome to Note Zipper</h1>
            <p className="subtitle">One Safe place for all your notes</p>
          </div>
          <div className="buttonContainer">
            <a href="/login">
              <Button
                variant="contained"
                size="large"
                className="landingButton"
                color="error"
                endIcon={<LoginIcon fontSize="small" />}
              >
                Login
              </Button>
            </a>
            <a href="/login">
              <Button
                variant="contained"
                size="large"
                className="landingButton"
                color="error"
                endIcon={<FiberNewIcon fontSize="small" />}
              >
                Sign Up
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Landing;
