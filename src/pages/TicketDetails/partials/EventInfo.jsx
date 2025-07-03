import React from "react";

const isHtmlString = (str) => {
  if (!str || typeof str !== "string") return false;
  const htmlRegex = /<([A-Z][A-Z0-9]*)\b[^>]*>/i;
  return htmlRegex.test(str);
};

export default function EventInfo({ event }) {
  const description = event?.description;

  if (!description) {
    return null;
  }

  return (
    <div className="bg-white mx-4 rounded-xl mb-4 shadow-md">
      <div className="text-lg font-medium py-4 pl-4 w-full border-b-2 text-gray-800  border-gray-300">
        Thông tin sự kiện
      </div>
      <div className="p-6">
        {isHtmlString(description) ? (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
        )}
      </div>
    </div>
  );
}
