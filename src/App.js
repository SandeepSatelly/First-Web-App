import "./styleSheet.css";

function App() {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I learned logo" />
        <h1>Today I Learned</h1>
      </div>
      <button className="btn btn-lrg btn-open">Share a fact</button>
    </header>
  );
}

export default App;
