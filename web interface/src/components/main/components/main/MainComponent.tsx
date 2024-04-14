import { useQuery } from "@tanstack/react-query"
import { getMachines } from "../../../../api/get_machines"

export function Mainconponent() {

  const { data, status } =
    useQuery(
      {
        queryKey: ['registred_Machines'],
        queryFn: getMachines
      })
  console.log(data, status)
  return status === 'success' && <div className="flex flex-wrap p-6 gap-8 flex-row">
    {data.map((e) =>
      <div className="customborder text-white p-4 w-40 ">
        <div className="">{e.maquina}</div>
        <div className="">{e.endereco_ip_}</div>
      </div>
    )
    }
  </div>
}
