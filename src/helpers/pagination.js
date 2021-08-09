const pagination = (num, arr, setFn) => {
  const startNum = 5 * (num - 1);
  const endNum = 5 * num;
  const sliced = arr.slice(startNum, endNum);
  setFn(sliced);
};

export default pagination;
