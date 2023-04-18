
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/Home'
import Login from "./components/Login";
import Register from "./components/Register";
import { useSelector } from 'react-redux';
import Book from "./components/Book";
import Cart from "./components/Cart";
import Admin from "./components/Admin/Admin";
import { useState } from "react";

function App() {
  const user = useSelector((state)=>state.auth.login?.currentUser)
  return (
    <Router>
      <div className="App h-100 bg-body-secondary"> 
        <Routes>
          <Route path="/" element={ user ? <Home/> : <Login />} />
          <Route path="/cart" element={ <Cart/> } />
          <Route path="/admin" element={ <Admin/> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
