import React from "react";
import QuantitySelector from "./QuantitySelector";

const TicketType = ({
  name,
  price,
  soldOut,
  description,
  quantity,
  setQuantity,
}) => {
  return (
    <div className="border-b border-gray-700 pb-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-primary font-bold">{name}</h3>
          <p className="text-white">{price} đ</p>
        </div>
        {soldOut === "Hết vé" ? (
          <span className="text-white bg-red-600 px-3 py-1 rounded-full">
            Hết vé
          </span>
        ) : (
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        )}
      </div>
      <div className="mt-2 bg-gray-300 rounded p-3 text-gray-800">
        {description}
      </div>
    </div>
  );
};

export default TicketType;
