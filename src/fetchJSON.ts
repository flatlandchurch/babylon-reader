const fetchJSON = (url: string) => {
  return fetch(url)
    .then((d) => d.json())
    .then((d) => {
      window.localStorage.setItem(url, JSON.stringify(d));
      return d;
    });
};

export default fetchJSON;
