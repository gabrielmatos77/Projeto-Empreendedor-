import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/register";
import './css/login.css'

export function SingIn() {
  const navi = useNavigate()
  const { mutate } =
    useMutation({
      mutationFn: (e: { user: string, pass: string }) => register(e.user, e.pass),
      onSuccess: (e) => {
        alert(e.data.mensagem)
        navi('/login')
      }

    });
  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dt = new FormData(e.currentTarget as HTMLFormElement)
    mutate({ user: dt.get('user') as string || "", pass: dt.get('pass') as string || "" })
  }
  return <div className="w-full h-screen bg-neutral-600 text-white flex justify-center items-center">
    <form onSubmit={submitHandle} className="customborder flex flex-col gap-4  border p-4 bg-neutral-500 justify-center items-center">
      <div className="rounded-full bg-teal-400 w-40 h-40 flex justify-center items-center">Logo</div>
      <label htmlFor="">Email</label>
      <input name="user" className="bg-transparent border rounded-md" type="text" />
      <label htmlFor="">Senha</label>
      <input name="pass" className="bg-transparent border rounded-md" type="password" />
      <label htmlFor="">Confirme A Senha</label>
      <input className="bg-transparent border rounded-md" type="password" />
      <button className="bg-teal-400 rounded-md p-2 text-center w-full hover:shadow-md hover:shadow-teal-500 
        active:scale-105 duration-150 ease-linear ">Cadastrar</button>
      <Link to="/login" className="bg-rose-400 rounded-md p-2 text-center w-full hover:shadow-md hover:shadow-rose-500 
        active:scale-105 duration-150 ease-linear ">Voltar</Link>
    </form>
  </div>
}
