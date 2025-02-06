// Import React and necessary dependencies
import React from "react";
import ReactDOM from "react-dom/client";

// Import main CSS file for styling
import "./index.css";

// Import the main App component
import App from "./App";

// Import reportWebVitals for performance measurement
import reportWebVitals from "./reportWebVitals";

// Import Redux provider and store for state management
import { Provider } from "react-redux";
import { store } from "./store";

// Get the root element to render the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the React application within the strict mode and Redux provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
