import { Link,NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
export default function Header() {
  return (<>
    <div className="w-full h-16 backdrop-filter backdrop-blur-sm flex justify-between text-xl  px-4 py-2 bg-opacity-0-[0.8] shadow-lg text-slate-100">
        <span className=" bg-transparent font-Inter font-bold text-[1.5rem]"><img src={logo} className='w-12 mr-3 h-12 inline-block'/>Agni-VI</span>
        <ul className="flex gap-5 text-zinc-400-700 mt-2 mr-4">
            <li><NavLink to='/' className={(isActive)=>isActive?"text-blue-400 underline-offset-8 underline":""}>Home</NavLink></li>
            <li><Link to='/about' className={(isActive)=>isActive?"text-blue-400":""}>About</Link></li>
            <li>Contacts</li>
            <li>Links</li>
        </ul>
    </div>
  </>
  )
}
