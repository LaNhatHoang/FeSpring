
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/Home/Home'
import Login from "./components/Login";
import { useSelector } from 'react-redux';
import Admin from "./components/Admin/Admin";
import History from "./components/History/History";

function App() {
  const user = useSelector((state)=>state.auth.login?.currentUser)
  return (
    <Router>
      <div className="App h-100 bg-body-secondary"> 
        <Routes>
          <Route path="/" element={ user ? <Home/> : <Login />} />
          <Route path="/admin" element={ <Admin/> } />
          <Route path="/history" element={ <History/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
