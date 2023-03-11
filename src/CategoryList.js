import { CATEGORIES as Constants } from "./Constants";

function CategoryList({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li>
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {Constants.map((catName) => (
          <li key={catName.name}>
            <button
              className="btn btn-restof-categories category"
              style={{
                backgroundColor: catName.color,
              }}
              onClick={() => setCurrentCategory(catName.name)}
            >
              {catName.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryList;
