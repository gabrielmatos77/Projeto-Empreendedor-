import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Link, useNavigate } from "react-router-dom";
import './aside.css'

export function Aside() {
  const singOut = useSignOut()
  const navi = useNavigate()
  const logoutHandle = () => {
    singOut()
    navi('/login')
  }
  return <aside className="asidewrap flex flex-col h-full  p-4 text-white w-40 ">
    <label className="labelinput">
      <p>{'>'}</p> <input id="inputhidden" type="checkbox" />
    </label>
    <Link className="navbutton" to={'/main/register_machine'}>Cadastrar Maquina</Link>
    <Link className="navbutton" to={'/main/reports'}>Relatorios</Link>
    <Link className="navbutton" to={'/main/machine_dashboard'}>Dashboard Maquinas</Link>
    <Link className="navbutton" to={'/main/'}>Dashboard Empresa</Link>
    <button className="navbutton logoutbutton" onClick={logoutHandle}>LogOut</button>
  </aside>
}
