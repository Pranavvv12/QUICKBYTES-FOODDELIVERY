import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { StoreContextProvider } from "./context/StoreContext";  // ✅ Import this

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
