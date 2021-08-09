export const addMembership = (arr) => {
  const newArr = arr.map((item) => {
    let membership;
    if (
      (item.amount > 0 && item.amount <= 20000) ||
      (item.price > 0 && item.price <= 20000)
    ) {
      membership = "Basic";
    } else if (
      (item.amount > 20000 && item.amount <= 50000) ||
      (item.price > 20000 && item.price <= 50000)
    ) {
      membership = "Gold";
    } else if (item.amount > 50000 || item.price > 50000) {
      membership = "Diamond";
    }
    return {
      ...item,
      membership,
      open: false,
    };
  });

  return newArr;
};

export const handleShowActions = (id, arr, setArr) => {
  setArr(
    arr.map((item) => {
      if (item._id === id) {
        item.open = !item.open;
      } else {
        item.open = false;
      }
      return item;
    })
  );
};
