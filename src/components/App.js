import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./nav-components/NavBar";
import Logo from "./nav-components/Logo";
import Nav from "./nav-components/Nav";
import Search from "./nav-components/Search";
import Main from "./main-components/Main";
import NewsContainer from "./main-components/NewsContainer";
import Footer from "./footer-components/Footer";

const API_KEY = `d4204d98aee44af0abc7cecdf8c5dfd5`;

function App() {
  const [query, setQuery] = useState("");

  return (
    <BrowserRouter>
      <Navbar>
        <Logo />
        <Nav />
        <Search query={query} setQuery={setQuery} />
      </Navbar>
      <Main>
        <Routes>
          <Route
            path="/"
            element={<NewsContainer query={query} apiKey={API_KEY} />}
          />
          <Route
            path="/:category"
            element={<NewsContainer query={query} apiKey={API_KEY} />}
          />
        </Routes>
      </Main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
