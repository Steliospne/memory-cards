export const capitalize = (str) => {
  if (str.includes("_")) {
    const tempArr = str.split("_");
    tempArr.forEach((element, index) => {
      tempArr[index] = element[0].toUpperCase() + element.slice(1);
    });
    return tempArr.join(" ");
  }
  return str[0].toUpperCase() + str.slice(1);
};

// const clickAudio = new Audio(clickSound);
