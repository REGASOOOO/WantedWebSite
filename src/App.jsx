import "./styles/index.scss";
import Map from "./component/Map";
import Liste from "./component/liste";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/liste/:statesName" element={<Liste />} />
        </Routes>
      </Router>
    </div>
  )
}