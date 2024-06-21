import { useQuery } from "@tanstack/react-query"
import { getDisp } from "../../../../../api/get_disp"

interface maqdetail {
  maq: string,
  efic: string,
}

export function MaqDetail({ maq, efic }: maqdetail) {
  const { data: disp, status } =
    useQuery(
      {
        queryKey: ['querydispon', maq],
        queryFn: () => getDisp(maq)
      })

  return status !== 'success' ? null : <div key={maq + 'sas'} onClick={() => {
    close()
  }} className="w-full h-full">
    <div>Eficiencia: {efic}%</div>
    <div>Disponibilidade: {disp.toFixed(2)}%</div>
    <div>Oee: {((disp * Number(efic) * 100) / 10000).toFixed(2)}%</div>
  </div>
}
