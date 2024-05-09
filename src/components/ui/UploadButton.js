import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function UploadButton({
  fileUploadRef,
  accept,
  onChange,
  multiple = false,
  title = "Upload Media",
  icon = <FileUploadIcon />,
  marginTop = "0px",
  marginLeft = "0px",
  marginRight = "0px",
  width = "auto",
  variant = "contained",
  newClassName = "uploadButton button yellowButton",
}) {
  return (
    <Button
      component="label"
      role={undefined}
      variant={variant}
      tabIndex={-1}
      startIcon={icon}
      className={newClassName}
      style={{
        textTransform: "none",
        marginTop: marginTop,
        marginLeft: marginLeft,
        marginRight: marginRight,
        width: width,
      }}
    >
      {title}
      <VisuallyHiddenInput
        type="file"
        ref={fileUploadRef}
        accept={accept}
        onChange={onChange}
        multiple={multiple}
      />
    </Button>
  );
}

export default UploadButton;
