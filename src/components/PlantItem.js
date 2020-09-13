import React from "react";

export const PlantItem = ({ item, onClick }) => {
  const { name } = item;
  return (
    <div
      className="flex flex-grow-1 p-4 rounded-lg bg-gray-100 mb-4 cursor-pointer"
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default PlantItem;
