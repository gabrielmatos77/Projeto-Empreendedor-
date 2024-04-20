import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getMachines } from "../../../../api/get_machines"
import { pocketBaseClient } from "../../../../util/pocketbase"
import { useEffect } from "react"
import './mainconponent.css'

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
        if (e.action === 'create') {
          query.setQueryData(['registred_Machines'], (oldData: { maquina: string }[]) => {
            return oldData ? [...oldData].map((x: { maquina: string }) => x.maquina === e.record.maquina ? e.record : x) : oldData
          })
        }
      }, {});
    pocketBaseClient
      .collection('parada_maquina').subscribe('*', function(e) {
        if (e.action === 'create') {
          query.setQueryData(['registred_Machines'], (oldData: { maquina: string }[]) => {
            return oldData ? oldData.map((x: { maquina: string }) => x.maquina === e.record.maquina ? e.record : x) : oldData
          })
        }
      }, {});
  }, [])
  console.log(data)
  return status === 'success' && <div className="flex flex-wrap p-6 gap-8 flex-row">
    {data.map((e) =>
      <div className="border-4 customborder text-white p-4 w-80 h-80 ">
        <div className={`${e.collectionName === 'parada_maquina' ?
          "parada" : "executando"} flex flex-col justify-around `}>
          <div className="">Nome: {e.expand?.maquina.maquina}</div>
          <div className="">Status: {
            e.collectionName === 'parada_maquina' ?
              e.tipo_par.replace("_", ' ') : "executando"}</div>
          <div className="">status iniciado em: {e.created}</div>
        </div>
      </div>
    )
    }
  </div>
}
