import { useState } from "react";
import * as Constants from "./Constants";
import supabase from "./supabase";

function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <p className="message">
        No facts for this category yet! Create first one 😎
      </p>
    );
  }
  return (
    <section>
      <ul className="factsList">
        {facts.map((fact) => (
          <Fact key={fact.id} props={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} in the Db</p>
    </section>
  );
}

function Fact({ props, setFacts }) {
  const isDisputed =
    props.votes_for_interesting + props.vote_for_mindblowing <
    props.vote_for_false;
  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">👎 🤬 [DISPUTED]</span> : null}
        {props.text}
        <Source prop={props} />
      </p>
      <Category prop={props} />
      <VoteCount prop={props} setFacts={setFacts} />
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

function VoteCount({ prop, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: prop[columnName] + 1 })
      .eq("id", prop.id)
      .select();

    setIsUpdating(false);

    if (!error) {
      setFacts((facts) =>
        facts.map((f) => (f.id === prop.id ? updatedFact[0] : f))
      );
    }
  }
  return (
    <div className="vote-buttons">
      <button
        onClick={() => handleVote("votes_for_interesting")}
        disabled={isUpdating}
      >
        👍 {prop.votes_for_interesting}
      </button>
      <button onClick={() => handleVote("vote_for_mindblowing")}>
        🤯 {prop.vote_for_mindblowing}
      </button>
      <button onClick={() => handleVote("vote_for_false")}>
        ⛔ {prop.vote_for_false}
      </button>
    </div>
  );
}

export default FactList;
