import { Route, Routes } from "react-router-dom";
import { Aside } from "./components/aside/aside";
import { RegisterMachine } from "./components/registerMachine/registerMachine";
import { Mainconponent } from "./components/main/MainComponent";

export function Main() {
  return <div className="bg-neutral-600 h-screen w-full flex overflow-hidden">
    <Aside />
    <div className="w-full h-full overflow-auto">
      <Routes>
        <Route path='/' element={<Mainconponent />} />
        <Route path='/register_machine' element={<RegisterMachine />} />
      </Routes>
    </div>
  </div>
}
