import {order} from '../services/order.js'

import { useNavigate } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { arrayProducts } from '../atoms/array.js'
import { emailState, alertState, firstnameState, lastnameState, addressState, cityState, orderIdState } from '../atoms/form.js'

import {getItems} from '../services/getItems.js'

function Cart() {

  const [ products, updateProducts ] = useRecoilState(arrayProducts)
  const [alert, updateAlert] = useRecoilState(alertState)
  const [email, updateEmail] = useRecoilState(emailState)
  const [firstname, updateFirstname] = useRecoilState(firstnameState)
  const [lastname, updateLastname] = useRecoilState(lastnameState)
  const [address, updateAdress] = useRecoilState(addressState)
  const [city, updateCity] = useRecoilState(cityState)
  const [orderId, updateOrder] = useRecoilState(orderIdState)

  const navigate = useNavigate()

  let getCart = JSON.parse(localStorage.getItem('cart'))
  let total = 0

  async function repGetproducts() {
    const result = await getItems()
    if (!result) {
      console.log('erreur')
    } else {
      updateProducts(result)
    }
  }

  function changeQty(id, color, qty) {
    let foundItem = getCart.find(p => p.id === id && p.color === color)
    if(foundItem) {
      foundItem.qty = +qty
      if(foundItem.qty > 0) {
        localStorage.setItem('cart', JSON.stringify(getCart))
      }
    }
  }

  function deleteProduct(id, color) {
    getCart = getCart.filter((item) => {
      if(item.id === id && item.color !== color) {
        return item.color !== color && item.id == id
      } else {
        return item.id !== id
      }
    })
    localStorage.setItem('cart', JSON.stringify(getCart))
    window.location.reload()
  }

  function verifEmail(value) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  }

  function validName(value) {
    return /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/.test(value);
}

  function handleEmail(value) {
    updateEmail(value)
    if (!verifEmail(value)) {
      updateAlert('Vérifier le format de votre e-mail')
    } else {
      updateAlert('')
    }
  }

  function handleFirstname(value) {
    updateFirstname(value)
    if (!validName(value)) {
      updateAlert('Vérifier votre prénom :)')
    } else {
      updateAlert('')
    }
  }

  function handleLastname(value) {
    updateLastname(value)
    if (!validName(value)) {
      updateAlert('Vérifier votre prénom :)')
    } else {
      updateAlert('')
    }
  }

  function foundProduct(id, color, qty) {
    let foundProduct = products.find(p => p._id === id)
    if (!foundProduct) {
      repGetproducts()
      return (
        <div>Chargement</div>
      )
    } else {
      return (
        <div className='w-full p-2 flex'>
          <div className='w-4/12 flex justify-center'>
            <img src={foundProduct.imageUrl} className='w-40 h-24 object-cover rounded-lg shadow-lg'/>
          </div>
          <div className='p-2 w-8/12 flex flex-col'>
            <p className='font-medium text-xl'>{foundProduct.name}</p>
            <p className='flex items-center mt-4 text-sm'>Quantitée : <input className='outline-none ml-2 p-2' type='number' min='1' max='99' placeholder={qty} onChange={(e) => e.preventDefault(changeQty(id, color, e.target.value))}/></p>
            <p className='mt-6 text-sm'>Couleur : <span className='font-medium'>{color}</span></p>
            <p className='mt-2 text-sm'>Prix : <span className='font-medium'>{foundProduct.price}</span> €</p>
            <button onClick={(e) => e.preventDefault(deleteProduct(id, color))} className='mr-0 ml-auto p-2 bg-sky-600 rounded-lg text-sm text-white hover:shadow-lg'><i className='fas fa-trash text-red-200' /> Supprimer</button>
          </div>
        </div>
      )
    }
  }


  function submit() {
    if(alert) {
      updateAlert('Veuillez vérifier tous les champs')
      return false
    }
    if (!email || !firstname || !lastname || !address || !city) {
      updateAlert('Veuillez remplir tous les champs')
      return false
    }
    if (!alert && email && firstname && lastname && address && city) {
      if(getCart.length !== 0) {
        let contact = {
          lastName: lastname,
          firstName: firstname,
          address: address,
          city: city,
          email: email
        }
        let products = []

        async function repOrder() {
          const result = await order(contact, products)
          if (!result) {
            console.log('erreur')
          } else {
            updateOrder(result)
            window.location.assign('/order/' + result)
          }
        }
        repOrder()
      }
    }
  }

  function totalPrice() {
    for(let i = 0; i < getCart.length; i ++) {
      let findProduct = products.find(p => p._id === getCart[i].id)
      total += findProduct.price * getCart[i].qty
    }
    return total
  }

  function totalProducts() {
    let totalItems = 0
    for (let i = 0; i < getCart.length; i++) {
      totalItems += +getCart[i].qty
    }
    return totalItems
  }

  return (
    <div className='pt-28 pb-6 flex flex-col items-center w-full bg-sky-400'>
      <div className='w-9/12 flex flex-col items-center'>
        <h1 className='mt-6 mb-2 text-6xl font-bold text-white'>Mon panier </h1>
        {getCart ? getCart.map(product =>
          <div className='w-full mb-2 border-b border-sky-800' key={product.id + product.color}>
            {foundProduct(product.id, product.color, product.qty)}
          </div>
        ) : ''}
        <div className='w-full h-10 border-b border-sky-800 flex justify-end'>
          <p className=''>Total : <span className='font-medium'>{totalPrice()}</span> € <span className='text-sm'>( {totalProducts()} articles )</span> </p>
        </div>
        <div className='w-full flex flex-col items-center'>
          <h2 className='font-bold text-xl text-white'>Commander</h2>
          <form className='flex flex-col w-9/12'>
            <p className='h-6 text-center font-medium text-red-900 text-sm'>{alert}</p>
            <label htmlFor='email' className='font-medium uppercase ml-2 p-1'>Email</label>
            <input className='p-2 outline-none' type='email' id='email' onChange={(e) => handleEmail(e.target.value)} value={email} placeholder='Votre e-mail'/>
            <label htmlFor='firstname' className='font-medium uppercase ml-2 p-1'>Prénom</label>
            <input className='p-2 outline-none' type='text' id='firstname' onChange={(e) => handleFirstname(e.target.value)} value={firstname} placeholder='Votre prénom'/>
            <label htmlFor='lastname' className='font-medium uppercase ml-2 p-1'>Nom</label>
            <input className='p-2 outline-none' type='text' id='lastname' onChange={(e) => handleLastname(e.target.value)} value={lastname} placeholder='Votre nom'/>
            <label htmlFor='address' className='font-medium uppercase ml-2 p-1'>Adresse</label>
            <input className='p-2 outline-none' type='text' id='address' onChange={(e) => updateAdress(e.target.value)} value={address} placeholder='Votre addresse'/>
            <label htmlFor='city' className='font-medium uppercase ml-2 p-1'>Ville</label>
            <input className='p-2 outline-none' type='text' id='city' onChange={(e) => updateCity(e.target.value)} value={city} placeholder='Ville'/>
            <button className='transition-all duration-200 mt-2 p-2 bg-sky-600 text-slate-900 rounded hover:shadow-lg hover:bg-emerald-400 hover:text-emerald-900' onClick={(e) => e.preventDefault(submit())}><i className='fas fa-check' /> Valider ma commande</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Cart
