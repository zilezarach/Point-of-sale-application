import React from "react";
import { IoBagHandle } from 'react-icons/io5';

const gridStats = ({ totalAmount }) => {
  function BoxWrapper({ children }) {
    return <div className="bg-white rounded-full p-1 flex-1 border border-rose-200 flex items-center mb-6 ml-3 mr-3 mt-3">{children}</div>
  }

  return (
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Amount This Week</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">${totalAmount.toFixed(2)}</strong>
          </div>
        </div>
      </BoxWrapper>
      {/* Add other BoxWrapper components if needed */}
    </div>
  );
}

export default gridStats;
