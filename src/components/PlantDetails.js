import React, { useState } from "react";
import { updatePlant } from "../actions";
import { connect } from "react-redux";

const PlantDetails = ({ item, onBackClick, updatePlant, currentPage }) => {
  const { name, population, climate } = item;
  const maxPopulation =
    population !== "unknown" ? parseInt(population) * 2 : 10000;
  const [updatedName, updateName] = useState(name);
  const [updatedPopulation, updatePopulation] = useState(
    population !== "unknown" ? parseInt(population) : 0
  );
  const [updatedClimate, updateClimate] = useState(climate.toLowerCase());

  const onClimateChange = (e) => {
    const name = e.target.name.toLowerCase();
    const climateArray = updatedClimate.split(",");

    if (e.target.checked) {
      climateArray.push(name);
      updateClimate(climateArray.toString());
    } else {
      const filteredArray = climateArray.filter(
        (item) => item.toLowerCase() !== name
      );
      updateClimate(filteredArray.toString());
    }
  };

  const onCancelClick = (e) => {
    e.preventDefault();
    updateName(name);
    updateClimate(climate);
    updatePopulation(population);
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    updatePlant(currentPage, {
      ...item,
      climate: updatedClimate,
      population: updatedPopulation,
      name: updatedName,
    });
    onBackClick();
  };

  return (
    <div className="">
      <div className="font-semibold mb-4 cursor-pointer" onClick={onBackClick}>
        Go Back
      </div>
      <form className="w-full">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={updatedName}
          max={10}
          onChange={(e) => updateName(e.target.value)}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="population"
        >
          Population
        </label>
        <div className="text-gray-700 leading-tight mb-4">
          {updatedPopulation}
        </div>
        <input
          id="population"
          className="w-full mb-4"
          type="range"
          step={10}
          value={updatedPopulation}
          min={0}
          max={maxPopulation}
          onChange={(e) => updatePopulation(e.target.value)}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="climate"
        >
          Climate
        </label>
        {/* <div className="text-gray-700 leading-tight mb-4">{updatedClimate}</div> */}
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            name="temperate"
            onChange={onClimateChange}
            checked={updatedClimate.indexOf("temperate") !== -1}
          />
          <span className="ml-2">Temperate</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="arid"
            className="form-checkbox"
            onChange={onClimateChange}
            checked={updatedClimate.indexOf("arid") !== -1}
          />
          <span className="ml-2">Arid</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            name="tropical"
            onChange={onClimateChange}
            checked={updatedClimate.indexOf("tropical") !== -1}
          />
          <span className="ml-2">Tropical</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="murky"
            className="form-checkbox"
            onChange={onClimateChange}
            checked={updatedClimate.indexOf("murky") !== -1}
          />
          <span className="ml-2">Murky</span>
        </label>
        <div className="flex items-center justify-between mt-8 mb-4">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={onCancelClick}
          >
            Reset
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onSubmitClick}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { currentPage } = state;
  return {
    currentPage,
  };
};

export default connect(mapStateToProps, {
  updatePlant,
})(PlantDetails);
