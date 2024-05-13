import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "../../styles/HomeHeader.css";

function HomeHeader({ setAddPalengkeClicked, Btn }) {
  return (
    <div className="header">
      <h1 className="headerTitle">Palengke For You</h1>
      <div className="relativeCont">
        {Btn && (
          <Button
            variant="contained"
            className="button addPalengkeButton pinkButton"
            style={{ textTransform: "none" }}
            onClick={() => setAddPalengkeClicked(true)}
          >
            Add Palengke
            <AddIcon className="muiAddIcon" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default HomeHeader;
