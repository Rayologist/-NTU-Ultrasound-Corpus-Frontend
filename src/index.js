import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Container } from "@mui/material";

ReactDOM.render(
  <React.StrictMode>
    <Container maxWidth="md">
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);
