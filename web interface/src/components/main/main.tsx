import { Route, Routes } from "react-router-dom";
import { Aside } from "./components/aside/aside";
import { RegisterMachine } from "./components/registerMachine/registerMachine";

export function Main() {


  return <div className="bg-neutral-600 h-screen w-full flex">
    <Aside />
    <div className="w-full">
      <Routes>
        <Route path='/main/' element={<></>} />
        <Route path='/register_machine' element={<RegisterMachine />} />
      </Routes>
    </div>
  </div>
}