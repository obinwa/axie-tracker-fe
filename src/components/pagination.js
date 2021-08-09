import { useState, useEffect } from "react";

import left from "../assets/left-arrow.svg";
import right from "../assets/right-arrow.svg";

const Pagination = ({ length, paginate, nextBtn, prevBtn, currPage }) => {
  const [offsets, setOffsets] = useState([]);
  const [slicedPages, setSlicedPages] = useState([]);
  useEffect(() => {
    const numOfPages = Math.ceil(length / 5);
    const pagesArr = [];
    for (let i = 1; i <= numOfPages; i++) {
      pagesArr.push({
        num: i,
        active: i === 1 ? true : false,
      });
    }

    const sliced = pagesArr.slice(0, 10);

    setSlicedPages(sliced);
    setOffsets(pagesArr);
  }, [length]);

  useEffect(() => {
    if (offsets.length > 0) {
      setPageOffsets(currPage);
    }

    const index = slicedPages.findIndex((item) => item.num === currPage);
    const secondNum = slicedPages.find((item, index) => index === 2);
    const firstNum = slicedPages.find((item, index) => index === 1);
    const lastNum = slicedPages.find((item, index) => index === 9);
    const lastNumIndex = slicedPages.find(
      (item, index) => item.num >= 3 && index === 0
    );

    if (currPage !== offsets.length) {
      if (index >= 8 && lastNum.num !== offsets.length) {
        const sliced = offsets.slice(secondNum.num - 1, lastNum.num + 2);
        setSlicedPages(sliced);
      }

      if (currPage === offsets.length || currPage === offsets.length - 1) {
        const sliced = offsets.slice(offsets.length - 10);
        setSlicedPages(sliced);
      }
    }

    if (index <= 1 && lastNumIndex) {
      const sliced = offsets.slice(firstNum.num - 4, lastNum.num - 2);
      setSlicedPages(sliced);
    } else if (currPage === 1 || currPage === 2) {
      // console
      const sliced = offsets.slice(0, 10);
      setSlicedPages(sliced);
    }else{
      console.log(index, lastNumIndex)
    }
  }, [currPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeNumber = (num) => {
    paginate(num);
    setPageOffsets(num);
  };

  const setPageOffsets = (num) => {
    const newPages = slicedPages.map((item) => {
      if (+item.num === num) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setSlicedPages(newPages);
    // setOffsets(newPages);
  };

  return (
    <div className="pagination">
      <div className="pagination__container">
        <div onClick={prevBtn} className="pagination__img">
          <img src={left} alt="left" />
        </div>
        {slicedPages.map((p) => (
          <span
            key={p.num}
            className={p.active ? "active" : ""}
            onClick={() => activeNumber(+p.num)}
          >
            {p.num}
          </span>
        ))}
        <div onClick={nextBtn} className="pagination__img">
          <img src={right} alt="right" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
