import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import "react-loading-skeleton/dist/skeleton.css";
import { store } from "./store/store";
import { initializeApp } from "firebase/app";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiy5-Ca2opWB_DdIhsEjr9bRjEjiuBzvk",
  authDomain: "latamwallet.firebaseapp.com",
  projectId: "latamwallet",
  storageBucket: "latamwallet.appspot.com",
  messagingSenderId: "544537021396",
  appId: "1:544537021396:web:ae082ba47bc4a4abce6441",
  measurementId: "G-BPMN5GRNQC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
);
