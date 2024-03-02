import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// import style radix
import '@radix-ui/themes/styles.css';

// import theme from radix
import { Theme } from '@radix-ui/themes';

// import Toaster from sonner
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster duration={2000} position="top-right"/>
    <Theme appearance="dark">
      <App />
    </Theme>
  </React.StrictMode>,
);
