import { Container } from "@mui/material";
import React from "react";
import "./MainScreen.css";

const MainScreen = ({ title, children }) => {
  return (
    <div className="mainBackground">
      <Container>
        <div className="pages">
          {title && (
            <>
              <h1 className="heading">{title}</h1>
            </>
          )}
          {children}
        </div>
      </Container>
    </div>
  );
};

export default MainScreen;
