import { useRecoilState } from 'recoil'
import { firstnameState } from '../atoms/form.js'

function Confirm() {

  let url = new URL(window.location.href);
  const getId = url.pathname.split('/order/');

  return (
    <div className='pt-28 pb-6 h-screen flex flex-col items-center w-full bg-sky-400'>
      <div className='w-9/12 flex flex-col items-center'>
        <h1 className='mt-6 mb-2 text-6xl font-bold text-white'>Confirmation commande </h1>
        <div className='mt-6 p-6 bg-white border w-9/12 h-40 flex items-center justify-center rounded-lg shadow-lg'>
          <p className='text-slate-800'>Merci pour votre commande ! Voici votre numéro de commande : <span className='text-cyan-600 font-medium'>{getId[1]}</span></p>
        </div>
      </div>
    </div>
  )
}

export default Confirm
