import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

import PurchasePage from "./pages/PurchasePage";
import ProfilePage from "./pages/ProfilePage";
import ServicesPage from "./pages/ServicesPage";
import WalletPage from "./pages/WalletPage";
import AffiliatesPage from "./pages/AffiliatesPage";
import BottomNavigation from "./components/BottomNavigation";
import CryptoPaymentPage from "./pages/Wallet/Increase/CryptoPaymentPage";
import CardPaymentPage from "./pages/Wallet/Increase/CardPaymentPage";



function App() {
    useEffect(() => {
        // Initialize Telegram Web App
        const tg = window.Telegram.WebApp;
        tg.ready();

        // دریافت اطلاعات کاربر
        const user = tg.initDataUnsafe.user;
        console.log("User Data:", user);

        // تنظیم رنگهای متناسب با تم تلگرام
        document.body.style.backgroundColor = tg.themeParams.bg_color;
    }, []);
    const theme = createTheme({
        typography: {
            fontFamily: 'IRANSans, Roboto, Helvetica, Arial, sans-serif',
        },
        palette: {
            primary: {
                main: "#1976d2",
            },
            success: {
                main: "#4caf50",
            },
        },
    });

  return (
      <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/shop" element={<PurchasePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/affiliates" element={<AffiliatesPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/wallet/increase/crypto" element={<CryptoPaymentPage />} />
            <Route path="/wallet/increase/card" element={<CardPaymentPage />} />

        </Routes>
        <BottomNavigation />
      </Router>
      </ThemeProvider>
  );
}

export default App;