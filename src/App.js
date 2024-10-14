import './App.css';
import Filters from './components/Filters';
import Header from './components/Header';
import Table from './components/Table';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
      <div>
        {/* Navigation Links */}
        <Header/>
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
