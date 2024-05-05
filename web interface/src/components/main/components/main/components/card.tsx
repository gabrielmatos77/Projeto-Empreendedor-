import { RecordModel } from "pocketbase";
import '../mainconponent.css'
import { useQuery } from "@tanstack/react-query";
import { getTotalProd } from "../../../../../api/get_total_prod";

function addDays(date: Date, days: number) {
  const dt = new Date(date)
  dt.setDate(dt.getDate() + days)
  return dt
}
export function CardInfo({ data }: { data: RecordModel }) {
  const { data: totalProd, status } =
    useQuery(
      {
        queryKey: ['total_prod', data.expand?.maquina.id],
        queryFn: () => getTotalProd(data.expand?.maquina.id)
      })
  const e = data
  console.log(totalProd?.total_day_prod)
  return status === 'success'
    && <div key={e.id} className="border-4 customborder transition-all duration-150 text-white p-4 w-80 h-80 ">
      <div key={e.id} className={`${e.collectionName === 'parada_maquina' ?
        "parada" : "executando"} flex flex-col justify-around `}>
        <div className="">Nome: {e.expand?.maquina.maquina}</div>
        <div>Proxima Manutenção: {
          addDays(new Date(e.expand?.maquina.ultima_manutencao), e.expand?.maquina.periodicidade).toLocaleDateString()}</div>
        <div className="">{e.collectionName === 'parada_maquina' ?
          '' : 'Produzido Desde Ultima Parada: ' + e.qtd_prod}</div>
        <div className="">{e.collectionName === 'parada_maquina' ?
          'Produzido Hoje: ' + totalProd?.total_day_prod + '/' +
          e.expand?.maquina.meta_diaria : 'Produzido Hoje: ' + (totalProd?.total_day_prod + e.qtd_prod) + '/' +
          e.expand?.maquina.meta_diaria}</div>
        <div className="">Status: {
          e.collectionName === 'parada_maquina' ?
            e.tipo_par.replace("_", ' ') : "executando"}</div>
        <div className="">status iniciado em: {e.created}</div>
      </div>
    </div>
}
