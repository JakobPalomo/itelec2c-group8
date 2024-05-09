import "../../styles/Profile.css";
import { Avatar, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PlaceIcon from "@mui/icons-material/Place";

export default function Profile() {
  return (
    <div className="profile">
      <div className="cover" />
      <div className="profcontent">
        <div className="pfp">
          <Avatar
            className="avatar"
            alt="Aliah"
            src="/assets/pfp.jpg"
            sx={{ width: 250, height: 250 }}
          />
          <IconButton className="profbutton">
            <AddIcon />
          </IconButton>
          <div className="pfpinfo">
            <h1>ALIAH ESTEBAN MAASIM</h1>
            <h2>
              <PlaceIcon sx={{ fontSize: "30px" }} />
              Pasig Palengke, 258 Dr. Pilapil St., Pasig
            </h2>
          </div>
        </div>
        <Button className="editbutton">Edit Profile</Button>
      </div>
    </div>
  );
}
