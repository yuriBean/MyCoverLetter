import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Basket from './components/Basket';
import Login from './components/Login';
import CreateCoverLetter from './components/CreateCoverLetter';
import Payments from './components/Payments';
import { UserProvider } from './context/UserContext'; // Import UserProvider

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cover" element={<CreateCoverLetter />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;