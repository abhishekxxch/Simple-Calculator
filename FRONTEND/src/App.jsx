import Calculator from "./calculator";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <div className="hero-card">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="hero-content">
          <p className="eyebrow">Smart calculator experience</p>
          <h1>Neon Math Studio</h1>
          <p className="hero-text">
            A sleek calculator with animated feedback, a fast backend, and a
            polished experience for everyday math.
          </p>
        </div>
      </div>
      <Calculator />
    </div>
  );
}

export default App;