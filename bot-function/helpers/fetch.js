import fetch from 'node-fetch'

export const fetchUrl = async (url) =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => data)
