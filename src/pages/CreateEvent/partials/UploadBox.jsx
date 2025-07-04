import React from "react";

export default function UploadBox({
  name,
  label,
  size,
  image,
  onChange,
  wi,
  he,
}) {
  return (
    <div
      className={`${he} ${wi} border-dotted bg-[#393F4E] rounded-xl border-2 border-white flex flex-col items-center justify-center space-y-2 relative`}
    >
      {image ? (
        <img
          name={name}
          src={image}
          alt="Upload Preview"
          className="absolute rounded-lg inset-0 w-full h-full object-cover"
        />
      ) : (
        <>
          <span className="text-4xl ">📷</span>
          <span className=" text-white ">{label}</span>
          <span className="text-sm text-white font-semibold">({size})</span>
        </>
      )}
      <input
        name={name}
        type="file"
        accept="image/*"
        onChange={onChange}
        className="opacity-0 absolute  inset-0 w-full h-full cursor-pointer"
      />
    </div>
  );
}
