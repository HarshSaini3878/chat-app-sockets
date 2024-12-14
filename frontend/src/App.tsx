import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Basic from "./components/Basic";
import Home from "./components/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/basic" element={<Basic />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
