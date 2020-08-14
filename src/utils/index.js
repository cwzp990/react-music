import { func } from "prop-types"

export function convertCount (count) {
  if (count >= 100000000) {
    return (count / 100000000).toFixed(2) + '亿'
  } else if (count >= 10000) {
    return (count / 10000).toFixed(2) + '万'
  } else {
    return count
  }
}

export function today() {
  return new Date().getDate()
}

export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};
