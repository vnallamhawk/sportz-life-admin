import React from "react";
import Select from "../Select";
import { COACH_CERTIFICATES_CONSTANTS } from "~/constants/coachConstants";

export default function AddCoachCertificates() {
  return (
    <div>
      <Select
        options={COACH_CERTIFICATES_CONSTANTS}
        placeholder={"Select Certificate"}
      />
    </div>
  );
}
