import {
  StrictMode,
} from "react";

import {
  createRoot,
} from "react-dom/client";

import {
  App,
} from "./App";

// @ts-expect-error CSS files are handled by the bundler at runtime.
import "./styles.css";

const rootElement =
  document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element was not found.",
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);