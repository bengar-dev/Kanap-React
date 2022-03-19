export function order(contact, products) {
  const axios = require('axios')

  let data = {contact, products}

  return axios.post('http://localhost:3000/api/products/order', data)
    .then(function(response) {
      return response.data.orderId
    })
    .catch(function (error) {
      console.log(error)
      return false
    })
}
