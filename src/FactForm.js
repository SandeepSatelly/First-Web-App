import { useState } from "react";
import "./styleSheet.css";
import * as Constants from "./Constants";
import FactList from "./FactList";

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function FactForm() {
  const count = 200;
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;
  const [facts, setFacts] = useState(Constants.initialFacts);
  function handleSubmit(e) {
    //Prevent page loading on clicking a button
    e.preventDefault();

    //If the data is valid
    if (text && isValidHttpUrl(source) && category) {
      const newFact = {
        id: 4,
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: 2023,
      };
    }
    //Create a new fact

    //reset input fields

    //Close the form
  }

  return (
    <form className="factForm" onSubmit={handleSubmit}>
      <input
        type="text"
        maxLength={200}
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <span>{count - textLength}</span>
      <input
        type="text"
        placeholder="Trust worthy source..."
        value={source}
        onChange={(event) => setSource(event.target.value)}
      />
      <CategoryFilter category={category} setCategory={setCategory} />
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter({ category, setCategory }) {
  return (
    <aside>
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="">Choose category:</option>
        {Constants.CATEGORIES.map((catName) => (
          <option key={catName.name} value={catName.name}>
            {catName.name.toUpperCase()}
          </option>
        ))}
      </select>
    </aside>
  );
}

export default FactForm;
