import React from "react";
import FormSection from "./FormSection";
import { sEvent2 } from "../eventStore";

export default function OrganizerInput() {
  const eventInfo = sEvent2.use();

  return (
    <FormSection>
      <div className="">
        <div className="flex-1 space-y-2  ">
          <label className="text-white">
            <span className="text-[#C83030] font-bold text-lg">* </span>Tên ban
            tổ chức
            <br />
            <input
              spellCheck="false"
              type="text"
              className="w-full mt-2 p-2 mb-4 bg-white text-black outline-none border border-gray-600 rounded"
              value={eventInfo.organizer_name}
              onChange={(e) =>
                sEvent2.set(
                  (pre) => (pre.value.organizer_name = e.target.value)
                )
              }
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="text-white">
              <span className="text-[#C83030] font-bold text-lg">* </span>
              Email ban tổ chức
              <br />
              <input
                spellCheck="false"
                type="text"
                className="w-full mt-2 p-2 mb-4 bg-white text-black outline-none border border-gray-600 rounded"
                value={eventInfo.organizer_email}
                onChange={(e) =>
                  sEvent2.set(
                    (pre) => (pre.value.organizer_email = e.target.value)
                  )
                }
              />
            </label>
            <label className="text-white">
              <span className="text-[#C83030] font-bold text-lg">* </span>
              SĐT ban tổ chức
              <br />
              <input
                spellCheck="false"
                type="text"
                className="w-full mt-2 p-2 mb-4 bg-white text-black outline-none border border-gray-600 rounded"
                value={eventInfo.organizer_phone_number}
                onChange={(e) =>
                  sEvent2.set(
                    (pre) => (pre.value.organizer_phone_number = e.target.value)
                  )
                }
              />
            </label>
          </div>
          <label className="text-white">
            <span className="text-[#C83030] font-bold text-lg">* </span>
            Thông tin ban tổ chức
            <br />
            <textarea
              spellCheck="false"
              className="w-full mt-2 p-2 bg-white text-black outline-none border border-gray-600 rounded h-20"
              value={eventInfo.organizer_info}
              onChange={(e) =>
                sEvent2.set(
                  (pre) => (pre.value.organizer_info = e.target.value)
                )
              }
            ></textarea>
          </label>
        </div>
      </div>
    </FormSection>
  );
}
