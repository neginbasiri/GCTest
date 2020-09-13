import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPage, setCurrentPage } from "../actions";

const Pagination = (props) => {
  const {
    perPageCount = 10,
    currentPage,
    getPage,
    plants,

    setCurrentPage,
  } = props;
  const [pagesNo, setPagesNo] = useState();

  useEffect(() => {
    if (plants[currentPage]) {
      const totalCount = plants[currentPage].count;
      setPagesNo(Math.ceil(totalCount / perPageCount));
    }
  }, [plants, currentPage]);

  const findPage = (page) => {
    if (plants.hasOwnProperty(page)) {
      setCurrentPage(page);
    } else {
      getPage(page);
    }
  };

  return (
    <div className="flex justify-between items-center w-full p-2">
      {currentPage && (
        <>
          {plants[currentPage].previous && (
            <div
              className="p-2 cursor-pointer"
              onClick={() =>
                currentPage > 1 ? findPage(currentPage - 1) : null
              }
            >
              Previous
            </div>
          )}
          <div className="flex justify-center items-center flex-1">
            {[...Array(pagesNo).keys()].map((item, index) => (
              <div
                className={`p-2 cursor-pointer ${
                  item + 1 === currentPage ? "font-bold" : ""
                }`}
                key={index}
                onClick={() => findPage(item + 1)}
              >
                {item + 1}
              </div>
            ))}
          </div>

          {plants[currentPage].next && (
            <div
              className="p-2 cursor-pointer"
              onClick={() => getPage(currentPage + 1)}
            >
              Next
            </div>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { currentPage, plants, isLoading, hasError } = state;
  return {
    currentPage,
    plants,
    isLoading,
    hasError,
  };
};

export default connect(mapStateToProps, {
  getPage,
  setCurrentPage,
})(Pagination);
