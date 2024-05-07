import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "../../styles/HomeHeader.css";

function HomeHeader() {
  return (
    <div className="header">
      <h1 className="headerTitle">Palengke For You</h1>
      <div className="relativeCont">
        <Button
          variant="contained"
          className="button pinkButton"
          style={{ textTransform: "none" }}
        >
          Add Palengke
          <AddIcon className="muiAddIcon" />
        </Button>
      </div>
    </div>
  );
}

export default HomeHeader;
