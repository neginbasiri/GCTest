import React, { useState, useEffect } from "react";
import PlantItem from "./PlantItem";
import PlantDetails from "./PlantDetails";
import orderBy from "lodash/orderBy";
import Pagination from "./Pagination";

const PlantList = (props) => {
  const { list } = props;
  const [searchParams, setSearchParams] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    let updatedList = [];
    if (list && list.length > 0) {
      const newList = list.filter((item) =>
        item.name.toLowerCase().includes(searchParams)
      );
      updatedList = orderBy(newList, ["name"], ["asc"]);
    }

    setFilteredList(updatedList);
  }, [searchParams, list]);

  return (
    <div className="p-4">
      {!selectedRow && (
        <div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchParams(e.target.value)}
            value={searchParams}
          />

          {filteredList &&
            filteredList.length > 0 &&
            filteredList.map((item, index) => (
              <PlantItem
                key={index}
                item={item}
                onClick={() => setSelectedRow(item)}
              />
            ))}
        </div>
      )}
      {selectedRow && (
        <PlantDetails
          item={selectedRow}
          onBackClick={() => setSelectedRow(null)}
        />
      )}
      {!selectedRow && <Pagination perPageCount={10} />}
    </div>
  );
};

export default PlantList;
