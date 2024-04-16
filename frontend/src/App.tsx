import { Link, Route, useLocation } from "react-router-dom";
import React from "react";
import "./App.css";
import Photography from "./pages/photography/Photography";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import About from "./pages/About/About";

function App() {
  // * Get active link
  const location = useLocation();
  const activeLink = location.pathname;

  // * Pages
  interface Page {
    name: string;
    url: string;
    element: React.JSX.Element;
  }
  const pages: Page[] = [
    { name: "photography", url: "/photography", element: <Photography /> },
    { name: "about", url: "/about", element: <About /> },
    { name: "contact", url: "/contact", element: <Contact /> },
    { name: "home", url: "/", element: <Home /> },
  ];

  return (
    <div className="app">
      {activeLink !== "/" && (
        <header className="main-header">
          <nav className="main-nav">
            <Link to="/">
              <h1>Tomas Ordonez Gonzalez</h1>
            </Link>

            <ul>
              {pages.map((page) => (
                <li key={page.name}>
                  <Link to={page.url} className={activeLink === page.url ? "active" : ""}>
                    {page.name.slice(0, 1).toUpperCase() + page.name.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      )}

      {pages.map((page) => {
        return (
          <Route exact={page.url === "/"} path={page.url}>
            {page.element}
          </Route>
        );
      })}

      <footer className="main-footer">
        <Link to="/">Home</Link>
        <p>© 2023 Tomas Ordonez Gonzalez.</p>
        <a
          onClick={() => {
            document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Top
        </a>
      </footer>
    </div>
  );
}
export default App;
