import "../../styles/PalengkeList.css";

function PalengkeList({ children }) {
  return (
    <div className="palengkeListContainer">
      <div className="palengkeList">{children}</div>
    </div>
  );
}

export default PalengkeList;
