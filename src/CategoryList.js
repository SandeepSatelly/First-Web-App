import { CATEGORIES as Constants } from "./Constants";

function CategoryList() {
  return (
    <aside>
      <ul>
        <li>
          <button className="btn btn-all-categories">All</button>
        </li>
        {Constants.map((catName) => (
          <li key={catName.name}>
            <button
              className="btn btn-restof-categories category"
              style={{
                backgroundColor: catName.color,
              }}
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
