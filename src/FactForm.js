import { useState } from "react";
import "./styleSheet.css";
import * as Constants from "./Constants";
import supabase from "./supabase";

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function FactForm({ setFacts, setShowForm }) {
  const count = 200;
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    //Prevent page loading on clicking a button
    e.preventDefault();

    if (text && isValidHttpUrl(source) && category) {
      setIsUploading(true);

      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();

      setIsUploading(false);

      !error ? setFacts((facts) => [newFact[0], ...facts]) : alert(error);

      setText("");
      setCategory("");
      setSource("");
      setShowForm(false);
    }
  }

  return (
    <form className="factForm" onSubmit={handleSubmit}>
      <input
        type="text"
        maxLength={200}
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(event) => setText(event.target.value)}
        disabled={isUploading}
      />
      <span>{count - textLength}</span>
      <input
        type="text"
        placeholder="Trust worthy source..."
        value={source}
        onChange={(event) => setSource(event.target.value)}
        disabled={isUploading}
      />
      <CategoryFilter
        category={category}
        setCategory={setCategory}
        isUploading={isUploading}
      />
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ category, setCategory, isUploading }) {
  return (
    <aside>
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        disabled={isUploading}
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
