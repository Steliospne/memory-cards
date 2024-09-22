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

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const swappingIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[swappingIndex]] = [array[swappingIndex], array[i]];
  }
  return array;
};

export const getChampions = (array, mode = "easy") => {
  const selectedChampions = [];
  let numberOfChampions = 5;

  switch (mode) {
    case "easy":
      numberOfChampions = 5;
      break;
    case "medium":
      numberOfChampions = 8;
      break;
    case "hard":
      numberOfChampions = 10;
      return array;
    default:
      numberOfChampions = 5;
      break;
  }
  for (let i = 0; i < numberOfChampions; i++) {
    let randomIndex = Math.floor(Math.random() * (array.length - 1));

    while (selectedChampions.includes(array[randomIndex])) {
      randomIndex = Math.floor(Math.random() * (array.length - 1));
    }
    selectedChampions.push(array[randomIndex]);
  }
  return selectedChampions;
};
