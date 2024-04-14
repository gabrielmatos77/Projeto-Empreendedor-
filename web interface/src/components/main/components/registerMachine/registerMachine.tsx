import { Link, useNavigate } from "react-router-dom";
import './css/registerMachine.css'
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import { registerMachine } from "../../../../api/registerMachine";

export function RegisterMachine() {
  const navi = useNavigate()
  const { mutate } =
    useMutation({
      mutationFn: (e: { name: string, ip: string }) => registerMachine(e.name, e.ip),
      onSuccess: () => {
        navi('/main/')
      }

    });
  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dt = new FormData(e.currentTarget as HTMLFormElement)
    mutate({ name: dt.get('name') as string || "", ip: dt.get('ip') as string || "" })
  }
  return <div className="w-full h-full flex justify-center items-center formanimated">
    <form
      onSubmit={submitHandle}
      className="customborder text-white border p-4 gap-4 flex flex-col items-center">
      <h1 className="text-4xl">Nova Maquina:</h1>
      <div className="firstdiv flex flex-col w-full">
        <label>
          Primeiro Digite O Nome Da Maquina:
        </label>
        <input id="firstfield" name="name" required type="text" className="border w-full bg-transparent p-2 rounded-md focus:outline-none" />
      </div>

      <div className="seconddiv flex flex-col w-full">
        <label>
          Agora Digite O Endereço Ip Da Maquina:
        </label>
        <input id="secondfield" name="ip" required type="text" className="border w-full bg-transparent p-2 rounded-md focus:outline-none" />
      </div>

      <button type="submit" className="bg-orange-400 rounded-md p-2 text-center w-full hover:shadow-md hover:shadow-orange-500 
        active:scale-105 duration-150 ease-linear ">Cadastrar</button>
      <Link to="/main/" className="bg-rose-400 rounded-md p-2 text-center w-full hover:shadow-md hover:shadow-rose-500 
        active:scale-105 duration-150 ease-linear ">Cancelar</Link>
    </form>
  </div>

}
