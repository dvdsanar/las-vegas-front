import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer";
import LoginUser from "./containers/LoginUser/LoginUser";
import Home from "./components/Home/Home";
import Register from "./containers/Register/Register";
import PopUp from "./containers/PopUp/PopUp";
import User from "./containers/User/User";
import ModifyUser from "./containers/ModifyUser/ModifyUser";
import AddCard from "./containers/AddCard/AddCard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginUser />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/modifyUser/:id" element={<ModifyUser />}></Route>
          <Route path="/addCard/:id" element={<AddCard />}></Route>
        </Routes>
        <PopUp />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
