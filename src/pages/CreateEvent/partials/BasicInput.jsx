/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { sEvent2 } from "../eventStore";
import FormSection from "./FormSection";
import UploadBox from "./UploadBox";
export default function BasicInput() {
  const eventInfo = sEvent2.use();
  const [types, setTypes] = useState([
    {
      _id: "675ea2da3f6438a553ef0afe",
      type_name: "Nhạc sống",
    },
    {
      _id: "675ea2f53f6438a553ef0b00",
      type_name: "Sân khấu & Nghệ thuật",
    },
    {
      _id: "675ea2fc3f6438a553ef0b02",
      type_name: "Thể thao",
    },
    {
      _id: "675ea3013f6438a553ef0b04",
      type_name: "Workshop",
    },
    {
      _id: "675ea3083f6438a553ef0b06",
      type_name: "Khác",
    },
  ]);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        sEvent2.set((pre) => {
          pre.value[field] = reader.result;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <FormSection title={"Upload hình ảnh"}>
        <div className="space-x-4 grid grid-cols-4">
          <UploadBox
            name="logo_url"
            wi="col-span-1"
            he="h-[26.25rem]"
            label="Thêm logo sự kiện"
            size="720x985"
            image={eventInfo.logo_url}
            onChange={(e) => handleFileChange(e, "logo_url")}
          />
          <UploadBox
            name="cover_image_url"
            wi="col-span-3"
            he="h-[26.25rem]"
            label="Thêm ảnh nền sự kiện"
            size="1280x720"
            image={eventInfo.cover_image_url}
            onChange={(e) => handleFileChange(e, "cover_image_url")}
          />
        </div>
      </FormSection>
      {/* Event Details Form */}
      <FormSection title="Tên sự kiện">
        <input
          spellCheck="false"
          type="text"
          className="w-full p-2 bg-white outline-none border border-gray-600 rounded"
          value={eventInfo.event_name}
          onChange={(e) => {
            sEvent2.set((pre) => {
              pre.value.event_name = e.target.value;
            });
          }}
        />
      </FormSection>
      <FormSection title="Thể loại sự kiện">
        <select
          className="w-full p-2 bg-white outline-none border border-gray-600 rounded text-black"
          value={eventInfo.event_type_id}
          onChange={(e) =>
            sEvent2.set((pre) => {
              pre.value.event_type_id = e.target.value;
            })
          }
        >
          <option value="">Chọn thể loại sự kiện</option>
          {types.map((type) => (
            <option key={type._id} value={type._id}>
              {type.type_name}
            </option>
          ))}
        </select>
      </FormSection>
    </div>
  );
}
