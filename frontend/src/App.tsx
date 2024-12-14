import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Basic from "./components/Basic";
import Home from "./components/Home";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/basic" element={<Basic />} />
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinRoom />} />
        <Route path="/create" element={<CreateRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
