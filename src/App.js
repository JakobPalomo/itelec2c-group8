import Navbar from "./components/Navbar.js";
import Search from "./components/homepage/Search.js";
import PalengkeList from "./components/homepage/PalengkeList.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Search />
      <PalengkeList />
    </div>
  );
}

export default App;
