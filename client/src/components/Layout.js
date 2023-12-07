import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";
const Layout = ({ children }) => {
  return (
    <div>
      {/* <h1>Layout</h1> */}
      <Header />
      <main style={{ minHeight: "70vh" }}>
        {children}
        <Toaster />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
