import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { login } from "../../api/login";
import { FormEvent } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";

export function Login() {
  const singIn = useSignIn()
  const { mutate, status } =
    useMutation({
      mutationFn: (e: { user: string, pass: string }) => login(e.user, e.pass),
      onSuccess: (e) => {
        e.data.user && singIn({
          auth: {
            token: "",
          },
          userState: {}
        })
      }

    });
  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dt = new FormData(e.currentTarget as HTMLFormElement)
    mutate({ user: dt.get('user') as string || "", pass: dt.get('pass') as string || "" })
  }
  return status === 'pending' ? null : <div className="w-full h-screen bg-neutral-600 text-white flex justify-center items-center">
    <form onSubmit={submitHandle}
      className="flex flex-col gap-4 rounded-lg border p-4 bg-neutral-500 justify-center items-center">
      <div className="rounded-full bg-teal-400 w-40 h-40 flex justify-center items-center">Logo</div>
      <label htmlFor="">Email</label>
      <input name="user" className="bg-transparent border rounded-md" type="text" />
      <label htmlFor="">Senha</label>
      <input name="pass" className="bg-transparent border rounded-md" type="password" />
      <button
        type="submit"
        className="bg-teal-400 rounded-md p-2 text-center w-full hover:shadow-md hover:shadow-teal-500 
        active:scale-105 duration-150 ease-linear ">Logar</button>
      <Link to="/singIn" className="bg-orange-400 rounded-md p-2 text-center w-full hover:shadow-md hover:shadow-orange-500 
        active:scale-105 duration-150 ease-linear ">Cadastrar</Link>
    </form>
  </div>
}
