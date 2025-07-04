import React from "react";
import MyEditor from "./MyEditor";
import LocationInput from "./LocationInput";
import BasicInput from "./BasicInput";
import OrganizerInput from "./OrganizerInput";
import FormSection from "./FormSection";
export default function Step1() {
  return (
    <div className="space-y-6">
      <BasicInput />

      <LocationInput />

      <FormSection title="Thông tin sự kiện">
        <MyEditor />
      </FormSection>

      <OrganizerInput />
    </div>
  );
}
