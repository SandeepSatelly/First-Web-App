//React project needs to be triggered through node
//npx create-react-app title of the proect
//npx create-react-app First-Web-App

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const showformBtn = document.querySelector(".factBtn");
const frm = document.querySelector(".factForm");
//console.log(showformBtn);
const factList = document.querySelector(".factsList");

//Creating DOM elements; Render face in List
factList.innerHTML = ""; //Clearing the existing list

//factList.insertAdjacentHTML("afterbegin", "<li>"); //After begin will add before the list

//create async function to load facts from external source
async function loadFacts() {
  //Loading data from external source - supabase
  //we use the FETCH command - Needs the URL and object to read the values\
  //await command will hold the call until it's called
  //await can be used only for funtions that return promises
  const response = await fetch(
    "https://tcemdaeqlctlqentpjup.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjZW1kYWVxbGN0bHFlbnRwanVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg0MDI1NjksImV4cCI6MTk5Mzk3ODU2OX0.TpLPnWWn9SUwTn4Ne2pdl-vmv3Qn7f0YXxGxiHVVR8w",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjZW1kYWVxbGN0bHFlbnRwanVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg0MDI1NjksImV4cCI6MTk5Mzk3ODU2OX0.TpLPnWWn9SUwTn4Ne2pdl-vmv3Qn7f0YXxGxiHVVR8w",
      },
    }
  );
  //convert to json format
  const data = await response.json();
  console.log(data);
  //const filteredData = data.filter((fact) => fact.category === "society");
  createFactList(data);
}
loadFacts();

function createFactList(dataArray) {
  const htmlArray = dataArray.map(
    (fact) => `<li class="fact">
    <p>
      ${fact.text}
        <a class="source"
        href="${fact.source}" target="_blank">
        (Source) </a>
      </p>
        <span class="tags"
        style="background-color: ${
          CATEGORIES.find((color) => color.name === fact.category).color
        }">
        ${fact.category}</span>
        <div class="vote-buttons">
              <button>👍 ${fact.votes_for_interesting}</button>
              <button>🤯 ${fact.vote_for_mindblowing}</button>
              <button>⛔ ${fact.vote_for_false}</button>
            </div>
    </li>`
  );

  const htmlString = htmlArray.join("");
  //console.log(htmlString);
  factList.insertAdjacentHTML("afterbegin", htmlString);
}

showformBtn.addEventListener("click", () => {
  if (frm.classList.contains("hidden")) {
    frm.classList.remove("hidden");
    showformBtn.textContent = "Close";
  } else {
    frm.classList.add("hidden");
    showformBtn.textContent = "Share a Fact";
  }
});
