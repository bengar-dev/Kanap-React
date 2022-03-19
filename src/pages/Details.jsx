import {getItem} from '../services/getItem.js'

import { useRecoilState } from 'recoil'
import { arrayProduct } from '../atoms/array.js'
import { priceState, qtyState, colorState } from '../atoms/states.js'

function Details() {

  const [ product, updateProduct ] = useRecoilState(arrayProduct)
  const [ price, updatePrice ] = useRecoilState(priceState)
  const [ qty, updateQty ] = useRecoilState(qtyState)
  const [color, updateColor] = useRecoilState(colorState)

  let url = new URL(window.location.href);
  const getId = url.pathname.split('/details/');

  async function repGetproduct() {
    const result = await getItem(getId[1])
    if (!result) {
      console.log('erreur')
    } else {
      updateProduct([result])
    }
  }

  if (product.length === 0  ) {
    repGetproduct()
  }

  function pushCart(id, qty, color) {
    let getCart = JSON.parse(localStorage.getItem('cart'))
    let cart = {id, qty, color}
    if (!color) {
      alert('Veuillez selectionner une couleur')
      return false
    }
    if (qty < 1) {
      alert('Veuillez selectionner une quantitée correct')
      return false
    }
    if (!getCart) {
      localStorage.setItem('cart', JSON.stringify([cart]))
    } else {
      let foundItem = getCart.find(p => p.id === id && p.color === color)
      if (foundItem) {
        foundItem.qty = +foundItem.qty + +cart.qty
        if (foundItem.qty > 0) { localStorage.setItem('cart', JSON.stringify(getCart)) }
      } else {
        if(cart.qty > 0) {
          getCart.push(cart)
          localStorage.setItem('cart', JSON.stringify(getCart))
        }
       }
    }
  }

  return (
    <div className='pt-28 pb-6 h-screen flex flex-col items-center w-full bg-sky-400'>
      <div className='w-9/12 flex flex-col items-center'>
        <h1 className='mt-6 text-6xl font-bold text-white'>Produit </h1>
        {product.map(details =>
          <div className='mt-6 flex flex-col items-center' key={details._id !== getId[1] ? repGetproduct() : details._id}>
            <p className='mb-2 text-2xl font-medium'>{details.name}</p>
            <img src={details.imageUrl} className='w-1/3 h-auto rounded-lg shadow-lg'/>
            <p className='w-8/12 mt-6 p-2 font-medium'>Description : <span className='font-light'>{details.description}</span></p>
            <form className='flex flex-col w-9/12 space-y-2'>
              <label htmlFor='color' className='mt-4 font-medium'>Couleur</label>
              <select onChange={(e) => updateColor(e.target.value)} className='p-2 bg-white outline-none' id='color'>
                <option>/</option>
                {details.colors.map(couleur => <option key={couleur} value={couleur}>{couleur}</option>)}
              </select>
              <label htmlFor='quantity' className='font-medium'>Quantitée</label>
              <input onChange={(e) => updateQty(e.target.value)} className='p-2 bg-white outline-none' type='number' id='quantity' min='1' max='100' placeholder='0'/>
              <label htmlFor='price' className='font-medium'>Prix</label>
              <p className='p-2 text-white font-bold'>{qty === 0 ? details.price : qty > 0 ? details.price * qty : details.price} €</p>
              <button onClick={(e) => e.preventDefault(pushCart(details._id, qty, color))} type='submit' className='transition-all bg-sky-800 p-2 w-60 text-white rounded hover:shadow-xl hover:text-cyan-400'><i className='fas fa-shopping-cart' /> Ajouter au panier</button>
            </form>
          </div>
      )}
      </div>
    </div>
  )
}

export default Details
