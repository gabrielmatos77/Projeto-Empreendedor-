import { Link } from "react-router-dom";

export function SingIn() {

  return <div className="w-full h-screen bg-neutral-600 text-white flex justify-center items-center">
    <form className="flex flex-col gap-4 rounded-lg border p-4 bg-neutral-500 justify-center items-center">
      <div className="rounded-full bg-teal-400 w-40 h-40 flex justify-center items-center">Logo</div>
      <label htmlFor="">Email</label>
      <input className="bg-transparent border rounded-md" type="text" />
      <label htmlFor="">Senha</label>
      <input className="bg-transparent border rounded-md" type="password" />
      <label htmlFor="">Confirme A Senha</label>
      <input className="bg-transparent border rounded-md" type="password" />
      <button className="bg-teal-400 rounded-md p-2 text-center w-full hover:shadow-md hover:shadow-teal-500 
        active:scale-105 duration-150 ease-linear ">Cadastrar</button>
      <Link to="/login" className="bg-rose-400 rounded-md p-2 text-center w-full hover:shadow-md hover:shadow-rose-500 
        active:scale-105 duration-150 ease-linear ">Voltar</Link>
    </form>
  </div>
}
