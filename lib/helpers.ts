import { GlobalState } from '@/hooks/use-global-state';
import { Champion } from '@/types/models';

export const shuffle = <TData>(array: TData[]): TData[] => {
  const arr = [...array]; // copy
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const getChampions = (
  array: Champion[],
  mode: GlobalState['state']['difficulty'] = 'easy'
) => {
  const selectedChampions: Champion[] = [];
  let numberOfChampions = 5;

  switch (mode) {
    case 'easy':
      numberOfChampions = 5;
      break;
    case 'medium':
      numberOfChampions = 8;
      break;
    case 'hard':
      numberOfChampions = 10;
      break;
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
