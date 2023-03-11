import { useState } from "react";
import * as Constants from "./Constants";

function FactList() {
  const facts = Constants.initialFacts;
  return (
    <section>
      <ul className="factsList">
        {facts.map((fact) => (
          <Fact key={fact.id} props={fact} />
        ))}
      </ul>
      <p>There are {facts.length} in the Db</p>
    </section>
  );
}

function Fact({ props }) {
  return (
    <li className="fact">
      <p>
        {props.text}
        <Source prop={props} />
      </p>
      <Category prop={props} />
      <VoteCount prop={props} />
    </li>
  );
}

function Source({ prop }) {
  return (
    <a
      className="source"
      href={prop.source}
      target="_blank"
      rel="noopener noreferrer"
    >
      (Source)
    </a>
  );
}

function Category({ prop }) {
  return (
    <span
      className="tags"
      style={{
        backgroundColor: Constants.CATEGORIES.find(
          (color) => color.name === prop.category
        ).color,
      }}
    >
      {prop.category}
    </span>
  );
}

function VoteCount({ prop }) {
  const [voted, setVote] = useState(0);
  return (
    <div className="vote-buttons">
      <button onClick={() => setVote((count) => count + 1)}>
        👍 {prop.votesFalse}
      </button>
      <button>🤯 {prop.votesMindblowing}</button>
      <button>⛔ {prop.votesFalse}</button>
    </div>
  );
}

export default FactList;
