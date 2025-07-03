// src/pages/partials/QuantitySelector.jsx
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React from "react";

const QuantitySelector = ({ quantity, setQuantity, maxQuantity = 10 }) => {
  const increase = () => {
    if (maxQuantity === undefined || quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };
  const decrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);
  const isDecreaseDisabled = quantity === 0;
  const isIncreaseDisabled =
    maxQuantity !== undefined && quantity >= maxQuantity;

  return (
    <div className="flex items-center space-x-3">
      <button
        className="w-8 h-8 cursor-pointer flex items-center justify-center bg-gray-700 text-white rounded-full transition-colors hover:bg-red-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
        onClick={decrease}
        disabled={isDecreaseDisabled}
        aria-label="Giảm số lượng"
      >
        <MinusIcon className="h-5 w-5" />
      </button>
      <span className="text-white font-bold text-lg w-8 text-center">
        {quantity}
      </span>
      <button
        className="w-8 h-8 cursor-pointer flex items-center justify-center bg-gray-700 text-white rounded-full transition-colors hover:bg-primary disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
        onClick={increase}
        disabled={isIncreaseDisabled}
        aria-label="Tăng số lượng"
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default QuantitySelector;
