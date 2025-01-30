import { createRoot } from "react-dom/client";
import "modern-normalize/modern-normalize.css";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./styles/index.ts";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
