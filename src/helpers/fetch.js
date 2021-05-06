import fetch from 'node-fetch'

export const fetchUrl = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
}
