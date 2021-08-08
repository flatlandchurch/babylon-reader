const fetchJSON = (url: string) => {
  if (window.localStorage.getItem(url)) {
    return Promise.resolve(JSON.parse(window.localStorage.getItem(url)));
  }

  return fetch(url)
    .then((d) => d.json())
    .then((d) => {
      window.localStorage.setItem(url, JSON.stringify(d));
      return d;
    });
};

export default fetchJSON;
