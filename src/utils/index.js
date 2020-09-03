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
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
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

export function getSinger (ar) {
  if (!ar.length) return ''
  if (ar.length === 1) return ar[0].name
  if (ar.length === 2) return `${ar[0].name} / ${ar[1].name}`
}

export function lyricParser (lyric) {
  if (!lyric) return []
  let newLyric = []
  const timeExp1 = /\[(.+?)\]/g
  const timeExp2 = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
  const arr = lyric.split('\n')
  arr.forEach(line => {
    let time = line.match(timeExp1)
    const txt = line.replace(timeExp2, '').trim()
    if (time) {
      time.forEach(t => {
        newLyric.push(`${t} ${txt}`)
      })
    }
  })
  newLyric = newLyric.map(line => {
    let result = timeExp2.exec(line)
    const txt = line.replace(timeExp2, '').trim()
    return {
      time: (result[1] * 60 * 1000 + result[2] * 1000 + Number(result[3])) / 1000,
      txt
    }
  })
  newLyric.sort((a, b) => {
    return a.time - b.time
  })
  return newLyric
}