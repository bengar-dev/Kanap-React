import bann from '../assets/banniere.png'

import { useNavigate } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { arrayProducts } from '../atoms/array.js'

import {getItems} from '../services/getItems.js'

function Home() {

  const navigate = useNavigate()

  const [ products, updateProducts ] = useRecoilState(arrayProducts)

  async function repGetproducts() {
    const result = await getItems()
    if (!result) {
      console.log('erreur')
    } else {
      updateProducts(result)
    }
  }

  if (products.length === 0) {
    repGetproducts()
  }

  return (
    <div className='flex flex-col'>
      <div className='w-full border-b border-sky-800 shadow'>
        <img src={bann} className='h-96 w-full object-cover'/>
      </div>
      <div className='flex justify-center w-full bg-sky-400'>
        <div className='w-9/12 flex flex-col justify-center items-center p-10'>
          <h1 className='text-6xl font-bold text-white'>Nos Produits</h1>
          <p className='font-medium'>Une gamme d'articles exclusifs</p>
          <main className='w-full mt-4 flex flex-wrap justify-around'>
            {products.map(product =>
              <div key={product._id} className='transition-all w-1/5 h-80 ml-4 mt-2 flex flex-col justify-center bg-slate-800 hover:bg-slate-700 p-2 rounded-lg border border-slate-800 hover:border-cyan-200 hover:shadow-lg '>
                  <img src={product.imageUrl} className='w-full h-28 object-cover rounded' alt={product.altTxt}/>
                  <h2 className='p-1 font-medium text-white'>{product.name}</h2>
                  <p className='text-white text-sm'>{product.description}</p>
                  <p className='mt-auto mb-1 mr-0 ml-auto text-white text-sm'>Prix: <span className='font-bold text-cyan-400'>{product.price}</span> €</p>
                  <button onClick={(e) => e.preventDefault(navigate('/details/' + product._id))} className='mt-auto mb-0 transition-all bg-cyan-400 hover:bg-cyan-500 rounded text-sm font-medium'>+ infos</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Home
