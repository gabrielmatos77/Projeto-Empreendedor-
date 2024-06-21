import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMachines } from '../../../../api/get_machines';
import { useEffect, useState } from 'react';
import { pocketBaseClient } from '../../../../util/pocketbase';
import './dashmaquina.css';
import { RecordModel } from 'pocketbase';

const filteredData = (dt: RecordModel[], id: string) => {
  return dt.filter(x => x.id === id)[0]
}
export function MachineDashboard() {
  const [selectedId, setSelectedId] = useState<string>('')
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

  console.log(data)
  return status !== 'success' ? null : <div className="w-full h-full maindashcontainer">
    <select className='selectdash' onChange={(e) => { setSelectedId(e.currentTarget.value) }}>
      <option value="">SELECIONE UMA MAQUINA</option>
      {data.map((a) => <option value={a.id}>{a.expand?.maquina.maquina}</option>)}
    </select>
    {selectedId !== '' &&
      <div className='bodycontentdash'>
        <h1 className='maqname'>Maquina: {filteredData(data, selectedId).expand?.maquina.maquina} </h1>
        <div className={filteredData(data, selectedId)
          .collectionName === 'parada_maquina' ? 'dashboardinfos Parada'
          : 'dashboardinfos Produzindo'}>
          <p>status: {filteredData(data, selectedId).collectionName === 'parada_maquina' ? 'Parada' : 'Produzindo'}</p>
          <p>inicio do status: {filteredData(data, selectedId).created}</p>
        </div>
        <div className="buttonsdash">
          <button>realizar Manutenção</button>
          <button>rejeitar peças</button>
        </div>
      </div>}
  </div>
}
