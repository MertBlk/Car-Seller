import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Head from "./Navbar";
import Main from "./Main";
import Products from "./Products";
import AracDetay from "./CarDetailScreen";
import Account from "./Account";

function App() {
  return (
    <BrowserRouter>
      <div id="app-container">
        <Head />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<Products />} />
          <Route path="/arac/:id" element={<AracDetay />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;