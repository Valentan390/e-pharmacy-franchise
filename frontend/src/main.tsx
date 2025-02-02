import { createRoot } from "react-dom/client";
import "modern-normalize/modern-normalize.css";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./styles";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyles />
          <App />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
