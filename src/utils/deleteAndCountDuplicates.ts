import { IBook } from '../types/types';

interface ReturnData {
  filteredData: IBook[];
  duplicatesCounter: number;
}

//  вариант через reduce
// type ReturnValue<T> = (inner: T[], outer: T[]) => { filteredData: (T | undefined)[], duplicatesCounter: number }
// type DefinedLookup = { [key: string]: IBook }

export function deleteAndCountDuplicates() {
  let duplicatesCounter = 0;
  return (initArr: IBook[], additionalArr: IBook[]): ReturnData => {
    const dict = [...initArr, ...additionalArr]
      .reduce<Record<string, IBook>>((acc, curr) => {
        if (acc[curr.id]) duplicatesCounter++;
        acc[curr.id] = curr;
        return acc;
      }, {});
    return {
      filteredData: Object.values(dict),
      duplicatesCounter,
    };
  };
}
