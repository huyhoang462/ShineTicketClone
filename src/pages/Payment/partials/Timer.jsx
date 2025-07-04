import React from "react";

const Timer = ({ minutes, seconds }) => {
  return (
    <div className={`flex items-center space-x-2 `}>
      <span className="bg-primary flex justify-center items-center rounded-xl">
        <span className="text-xl  w-16 h-16 flex font-bold justify-center items-center">
          {String(minutes).padStart(2, "0")}
        </span>
      </span>
      <span className="text-xl font-bold">:</span>
      <span className="bg-primary flex justify-center items-center rounded-xl">
        <span className="text-xl  w-16 h-16 flex font-bold justify-center items-center">
          {String(seconds).padStart(2, "0")}
        </span>
      </span>
    </div>
  );
};

export default Timer;
