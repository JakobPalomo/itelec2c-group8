import { useState } from "react";
import InputText from "./InputText.js";
import "../../styles/EditProfile.css";

function EditProfile({ setEditProfileClicked }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null); // State for cover photo
  const [pfpPhoto, setPfpPhoto] = useState(null); // State for profile picture

  const handleCoverPhotoChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handlePfpPhotoChange = (e) => {
    setPfpPhoto(e.target.files[0]);
  };

  return (
    <div className="editprofile">
      <div className="editphoto">
        <div className="editcover">
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverPhotoChange}
          />
          {coverPhoto && (
            <img
              src={URL.createObjectURL(coverPhoto)}
              alt="Cover Photo Preview"
            />
          )}
        </div>
        <div className="editpfp">
          <input type="file" accept="image/*" onChange={handlePfpPhotoChange} />
          {pfpPhoto && (
            <img
              src={URL.createObjectURL(pfpPhoto)}
              alt="Profile Picture Preview"
            />
          )}
        </div>
      </div>
      <div className="editfields">
        <InputText
          type="text"
          label="Edit Username:"
          required={true}
          setValue={setName}
          value={name}
          maxLength={100}
          placeholder="Username"
        />
        <InputText
          type="text"
          label="Edit Location:"
          required={true}
          setValue={setAddress}
          value={address}
          maxLength={255}
          placeholder="Select a location in the map"
        />
        <InputText
          type="password"
          label="New Password:"
          required={true}
          setValue={setPassword}
          value={password}
          maxLength={50}
        />
        <InputText
          type="password"
          label="Confirm New Password:"
          required={true}
          setValue={setConfirmPassword}
          value={confirmPassword}
          maxLength={50}
        />
      </div>
    </div>
  );
}

export default EditProfile;
