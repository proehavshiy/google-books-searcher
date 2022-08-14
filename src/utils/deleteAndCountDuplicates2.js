export function deleteAndCountDuplicates() {
  let duplicatesCounter = 0;
  return function (initArr, additionalArr) {
    const filteredDict = [...initArr, ...additionalArr].reduce((acc, curr) => {
      if (acc[`${curr.id}`]) duplicatesCounter++;
      acc[`${curr.id}`] = curr;
      return acc;
    }, {});
    return {
      filteredData: Object.values(filteredDict),
      duplicatesCounter,
    };
  };
}