import Search from "./Search.js";
import PalengkeList from "./PalengkeList.js";

function Home({ mainMargin }) {
  return (
    <div style={{ minHeight: mainMargin }}>
      <Search />
      <PalengkeList />
    </div>
  );
}

export default Home;
