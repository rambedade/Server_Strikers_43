import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
