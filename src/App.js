import { useState, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home" 
import Archives from "./pages/ArchivesNote" 
import Cookies from "js-cookie";

export const DataContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(
    Cookies.get("access_token") ? true : false
  );
  return (
    <BrowserRouter>
      <DataContext.Provider value={{ isLogin, setIsLogin }}>
        <div className="App">
          <Header />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Archives />} path="/archives" />
          </Routes>
        </div>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
