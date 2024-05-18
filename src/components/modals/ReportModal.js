import { useState, useEffect } from "react";
import InputText from "./InputText.js";
import {
  handleSetError,
  getHasError,
  getErrMessage,
} from "../../functions/utils.js";
import report_reasons_palengke from "../../data/report_reasons_palengke.js";
import report_reasons_review from "../../data/report_reasons_review.js";
import "../../styles/ReportModal.css";
import Button from "@mui/material/Button";

function ReportModal({
  setOpen,
  userId,
  IdToReport,
  reportCategory = "palengke",
}) {
  const initialErrorData = [
    { field: "reportReason", hasError: false, errMessage: "" },
    { field: "otherReason", hasError: false, errMessage: "" },
  ];

  const [reportReason, setReportReason] = useState(0);
  const [otherReason, setOtherReason] = useState("");
  const [errors, setErrors] = useState(initialErrorData);

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  // Validation function
  const validateReportDetails = () => {
    console.log(reportReason, otherReason, IdToReport, userId);

    let trimmedOtherReason = otherReason;
    if (
      trimmedOtherReason === undefined ||
      trimmedOtherReason === "undefined"
    ) {
      setOtherReason("");
      trimmedOtherReason = "";
    }
    // Trim strings
    trimmedOtherReason = otherReason.trim();
    setOtherReason(trimmedOtherReason);

    let tempErrors = initialErrorData.map((error) => ({ ...error })); // Create a copy of the initialErrorData array

    if (otherReason === "" && reportReason === 2) {
      tempErrors = tempErrors.map((error) =>
        error.field === "otherReason"
          ? { ...error, hasError: true, errMessage: "Reason is required" }
          : error
      );
    }

    setErrors(tempErrors);

    const hasError = tempErrors.some((field) => field.hasError);
    if (!hasError) {
      handleReport();
    }

    console.log(tempErrors);
  };

  const handleReport = async () => {
    console.log(reportReason, otherReason);
    const today = new Date();
    const dateString = today.toDateString();
    const formData = new FormData();
    try {
      // Append each file to FormData
      formData.append("user_id", userId);
      if (reportCategory === "palengke") {
        formData.append("palengke_id", IdToReport);
      } else if (reportCategory === "review") {
        formData.append("review_id", IdToReport);
      }
      formData.append("date", dateString);
      formData.append("reportReason", reportReason);
      formData.append("otherReason", otherReason);
      console.log(formData);

      // Upload the FormData to the server
      let response;
      if (reportCategory === "palengke") {
        response = await fetch(`/palengke/report?userId=${userId}`, {
          method: "POST",
          body: formData,
        });
      } else if (reportCategory === "review") {
        response = await fetch(`/review/report?userId=${userId}`, {
          method: "POST",
          body: formData,
        });
      }

      if (!response.ok) {
        throw new Error("Failed to report");
      }
      setOpen(false);
    } catch (error) {
      console.error("Error reporting:", error);
    }
  };

  // Cancel add palengke
  const handleCancelAndClearInput = () => {
    setReportReason(0);
    setOtherReason("");
  };

  useEffect(() => {
    console.log("rating");
    console.log(
      `reportReason ${reportReason}; otherReason: ${otherReason}; idToReport: ${IdToReport}; user_id: ${userId}`
    );
    if (reportReason < 2) {
      setOtherReason("");
      setErrors(initialErrorData);
    }
  }, [reportReason, otherReason]);

  return (
    <div className="ReportCont">
      <h3 className="reportTitle">
        Why are you reporting this {reportCategory}?
      </h3>
      <InputText
        type="text"
        setValue={setReportReason}
        value={reportReason}
        maxLength={10}
        selectData={
          reportCategory === "palengke"
            ? report_reasons_palengke
            : report_reasons_review
        }
        label="Reason"
        noLabel={true}
        defaultValue={0}
      />
      {reportReason === 2 && (
        <InputText
          fullWidth
          type="text"
          label="Review"
          required={true}
          setValue={setOtherReason}
          value={otherReason}
          maxLength={100}
          placeholder="Write your reason ..."
          hasError={getHasError("otherReason", errors)}
          errMessage={getErrMessage("otherReason", errors)}
          noLabel={true}
        />
      )}
      <div className="addPalengkeModalButtons">
        <Button
          variant="contained"
          className="button pinkButton mediaButtonMargin"
          style={{ textTransform: "none" }}
          onClick={(e) => {
            e.preventDefault();
            validateReportDetails();
          }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          className="outlinedButton outlinedPinkButton mediaButtonMargin"
          style={{ textTransform: "none" }}
          onClick={() => {
            handleCancelAndClearInput();
            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ReportModal;
