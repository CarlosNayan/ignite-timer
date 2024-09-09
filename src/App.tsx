import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { CyclesContextProvider } from "./contexts/CyclesContext";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { HistoryPage } from "./pages/History";
import { HomePage } from "./pages/Home";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <CyclesContextProvider>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/History" element={<HistoryPage />} />
            </Route>
          </Routes>
        </CyclesContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
