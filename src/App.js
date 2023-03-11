import "./styleSheet.css";
import HeaderText from "./Header.js";
import FactForm from "./FactForm.js";
import FactList from "./FactList";
import CategoryList from "./CategoryList";

function App() {
  return (
    <>
      <HeaderText />
      <main className="main">
        <CategoryList />
        <FactList />
      </main>
    </>
  );
}

export default App;
