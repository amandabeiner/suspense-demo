const REACT_APP_GITHUB_ACCESS_TOKEN = 'e352518214aa9ca2ee5683f17c7c9b88678c7154'

export default class Api {
  // All GraphQL requests are POST requests to one endpoint

  fetch(path) {
    const baseUrl = "https://api.github.com"
    debugger

    return global.fetch(`${baseUrl}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${REACT_APP_GITHUB_ACCESS_TOKEN}`
      }
    })
      .then(res => {
        return res.ok ? res.json() : res.then(inner => Promise.reject(inner))
      })
  }
}
