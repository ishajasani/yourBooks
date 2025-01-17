import "./App.css";
// import About from "./components/About/About";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookState from "./components/context/books/BookState";
// import Login from "./components/Login/Login";
// import Signup from "./components/Signup/Signup";
import { useState } from "react";
import Alert from "./components/Alert/Alert";

const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 1500);
  };

  return (
    <BookState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path="/home" element={<Home showAlert={showAlert} />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/login" element={<Login showAlert={showAlert} />} /> */}
            {/* <Route path="/signup" element={<Signup showAlert={showAlert} />} /> */}
          </Routes>
        </div>
      </Router>
    </BookState>
  );
};

export default App;
