import React, { useState } from "react";
import { Modal, Button, TextField } from "@mui/material";

function EditModal({ open, onClose, onEdit, initialComment }) {
  const [editedComment, setEditedComment] = useState(initialComment);

  const handleEdit = () => {
    onEdit(editedComment);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <h2>Edit Comment</h2>
        <TextField
          label="Comment"
          multiline
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <Button onClick={handleEdit}>Save</Button>
      </div>
    </Modal>
  );
}

export default EditModal;
