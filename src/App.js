import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPage } from "./actions";
import PlantList from "./components/PlantList";

const App = (props) => {
  const { plants, isLoading, hasError, currentPage } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    props.getPage(1);
  }, []);

  useEffect(() => {
    if (plants[currentPage]) {
      setList(plants[currentPage].results);
    }
  }, [plants, currentPage]);

  return (
    <div className="container mx-auto max-w-md">
      {hasError && (
        <div className="text-center p-4">Oops! Please try again.</div>
      )}
      {isLoading && <div className="text-center p-4">Loading...</div>}
      {!isLoading && !hasError && list.length > 0 && <PlantList list={list} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { plants, isLoading, hasError, currentPage } = state;
  return {
    currentPage,
    plants,
    isLoading,
    hasError,
  };
};

export default connect(mapStateToProps, {
  getPage,
})(App);
