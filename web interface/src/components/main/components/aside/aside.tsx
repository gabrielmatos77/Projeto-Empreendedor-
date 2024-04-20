import { Link } from "react-router-dom";

export function Aside() {
  return <aside className=" flex flex-col h-full bg-neutral-200 w-40 ">
    <input type="checkbox" />
    <Link to={'/main/register_machine'}>Cadastrar Maquina</Link>
    <Link to={'/main/reports'}>Relatorios</Link>
  </aside>
}
