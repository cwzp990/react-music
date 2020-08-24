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

export function formatPlayTime (interval) {
  interval = interval | 0;
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};

export function today () {
  return new Date().getDate();
}

export function getMonth () {
  let month = new Date().getMonth() + 1
  return String(month).padStart(2, '0')
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

// 获取cookie
export function getCookie (name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}