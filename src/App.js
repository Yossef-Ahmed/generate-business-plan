import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import CongratsPage from "./pages/CongratsPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style/App.scss"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/questions" element={<QuestionnairePage />} />
          <Route path="/congrats" element={<CongratsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
