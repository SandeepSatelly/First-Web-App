import "./styleSheet.css";
import HeaderText from "./Header.js";
import FactList from "./FactList";
import CategoryList from "./CategoryList";
import { useEffect, useState } from "react";
import * as Constants from "./Constants";
import supabase from "./supabase";

function App() {
  const [facts, setFacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all")
          query = query
            .eq("category", currentCategory)
            .order("votes_for_interesting", { ascending: false })
            .limit(15);

        setisLoading(true);
        let { data: facts, error } = await query
          .order("votes_for_interesting", { ascending: false })
          .limit(15);

        !error ? setFacts(facts) : alert("There was problem getting data");

        setisLoading(false);
      }
      getFacts();
    },
    [currentCategory] //loading data
  );

  return (
    <>
      <HeaderText
        facts={facts}
        setFacts={setFacts}
        showForm={showForm}
        setShowForm={setShowForm}
      />
      <main className="main">
        <CategoryList setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

export default App;
