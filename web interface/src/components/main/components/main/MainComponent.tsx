import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getMachines } from "../../../../api/get_machines"
import { pocketBaseClient } from "../../../../util/pocketbase"
import { useEffect } from "react"
import './mainconponent.css'
import { CardInfo } from "./components/card"





export function Mainconponent() {
  const query = useQueryClient();
  const { data, status } =
    useQuery(
      {
        queryKey: ['registred_Machines'],
        queryFn: getMachines
      })
  useEffect(() => {
    pocketBaseClient
      .collection('registro_producao').subscribe('*', function(e) {
        console.log(e.action)
        if (e.action === 'create' || e.action === 'update') {
          query.setQueryData(['registred_Machines'], (oldData: { maquina: string }[]) => {
            return oldData ? [...oldData].map((x: { maquina: string }) => x.maquina === e.record.maquina ? { ...x, ...e.record } : x) : oldData
          })
        }
      }, {});
    pocketBaseClient
      .collection('parada_maquina').subscribe('*', function(e) {
        if (e.action === 'create') {
          query.setQueryData(['registred_Machines'], (oldData: { maquina: string }[]) => {
            return oldData ? oldData.map((x: { maquina: string }) => x.maquina === e.record.maquina ? { ...x, ...e.record } : x) : oldData
          })
        }
      }, {});
  }, [query])


  return status === 'success' && <div className="flex flex-wrap justify-center p-6 gap-8 flex-row">
    {data.map((e) =>
      <CardInfo data={e} />
    )
    }
  </div>
}
