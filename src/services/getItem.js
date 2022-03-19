export function getItem(id) {
  const axios = require('axios')

  return axios.get('http://localhost:3000/api/products/' + id)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      return false
    })
}
