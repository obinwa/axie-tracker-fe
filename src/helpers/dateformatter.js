const formatter = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = new Date(date).toLocaleTimeString("en-US");

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

export default formatter;
