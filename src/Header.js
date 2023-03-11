import "./styleSheet.css";
import React, { useState } from "react";
import FactForm from "./FactForm";

function HeaderText() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header setShowForm={setShowForm} showForm={showForm} />
      {showForm ? <FactForm /> : null}
    </>
  );
}

function Header({ setShowForm, showForm }) {
  const appTitle = "Today I leared";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I learned logo" />
        <h1>{appTitle}</h1>
      </div>
      {
        <button
          className="btn btn-lrg btn"
          onClick={() => setShowForm((show) => !show)}
        >
          {showForm ? "Close" : "Share a Fact"}
        </button>
      }
    </header>
  );
}
export default HeaderText;
