import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
      <div>
        {/* Navigation Links */}

        <Routes>
          <Route path="/" element={<Filters />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
