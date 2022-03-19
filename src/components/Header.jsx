import logo from '../assets/logo-removebg.png'

import { useNavigate } from 'react-router-dom'

function Header() {

  const navigate = useNavigate()

  return (
    <header className='absolute flex flex-col w-full h-28'>
      <div className='flex items-center h-8 bg-white text-sm'>
        <p className='ml-10'><i className='fas fa-phone text-cyan-500' /> 01 23 45 67 89</p>
        <p className='ml-4'><i className='fas fa-envelope text-cyan-500' /> support@name.com</p>
        <p className='ml-4'><i className='fas fa-map-marker text-cyan-500' /> Paris, France</p>
      </div>
      <div className='flex items-center justify-around bg-sky-300 border-b border-sky-600 shadow-lg'>
        <img src={logo} className='h-20 w-auto'/>
        <nav className='p-4'>
          <ul className='flex space-x-2'>
            <li className='transition-all duration-200 text-slate-900 hover:text-cyan-600 font-medium border-b border-sky-300 hover:border-b hover:border-slate-900'><button onClick={(e) => e.preventDefault(navigate('/'))} alt='Panier'>Accueil</button></li>
            <li className='transition-all duration-200 text-slate-900 hover:text-cyan-600 font-medium border-b border-sky-300 hover:border-b hover:border-slate-900'><button onClick={(e) => e.preventDefault(navigate('/cart'))} alt='Panier'>Mon panier</button></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
