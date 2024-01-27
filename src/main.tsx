import React from "react";
import ReactDOM from "react-dom/client";
import CarsContextProvider from "./Store/index.tsx";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <Router>
      <CarsContextProvider>
        <App />
      </CarsContextProvider>
    </Router>
  </React.StrictMode>,
);
