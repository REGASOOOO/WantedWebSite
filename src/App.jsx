import "./styles/index.scss";
import Map from "./component/Map";
import Liste from "./component/liste";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();

  // Définir une classe conditionnelle pour le style de la page
  const appClassName = location.pathname === "/" ? "App flex-layout" : "App default-layout";

  return (
    <div className={appClassName}>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/liste/:statesName" element={<Liste />} />
      </Routes>
    </div>
  )
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}