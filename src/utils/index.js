//播放模式
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
};


export function convertCount (count) {
  if (count >= 100000000) {
    return (count / 100000000).toFixed(2) + "亿";
  } else if (count >= 10000) {
    return (count / 10000).toFixed(2) + "万";
  } else {
    return count;
  }
}

export function today () {
  return new Date().getDate();
}

export function debounce (func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.call(this, ...args);
    }, delay);
  };
}

export function more (txt, len) {
  if (txt.length >= len) {
    return txt.slice(0, len) + "...";
  } else {
    return txt;
  }
}

export function formatDate (time) {
  return new Date(parseInt(time))
    .toLocaleString()
    .replace(/:\d{1,2}$/, " ");
}

export function findIndex (list, music) {
  return list.findIndex(item => {
    return item.id === music.id
  })
}