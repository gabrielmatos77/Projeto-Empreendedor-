import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMachines } from '../../../../api/get_machines'
import { ParadasButton } from './paradas'
import './mainfilter.css'
import { ProdButton } from './producao'
export function MainFilter() {
  const { data, status } =
    useQuery(
      {
        queryKey: ['registred_Machines'],
        queryFn: getMachines
      })
  const [selectedFilter, setSelectedFlter] = useState<'' | 'paradas' | 'prod'>('')
  const [dataToPdf, setdataToPdf] = useState<{ date: string, maquina: string }>({ date: '', maquina: '' })
  return status !== 'success' ? null : <div>
    <div className='buttonsfilter'>
      <button onClick={() => {
        setdataToPdf({ date: '', maquina: '' })
        setSelectedFlter('paradas')
      }} className="filter">Paradas</button>

      <button onClick={() => {
        setdataToPdf({ date: '', maquina: '' })
        setSelectedFlter('prod')
      }} className="filter">Execuções</button>
    </div>
    {selectedFilter === 'paradas' && <div className='w-full paradarel flex justify-center items-center'>
      <div
        className='customborder' >

        <form
          className=' flex flex-col'
          onSubmit={(e) => {
            e.preventDefault()
            const dt = new FormData(e.target as HTMLFormElement)
            setdataToPdf({ date: dt.get('data') as string || '', maquina: dt.get('maquina') as string || '' })
          }
          }>
          <h1>PARADA</h1>
          <input type="date" name={'data'} />
          <select name={'maquina'}>
            {data.map((e) => <option value={e.expand?.maquina.id}>{e.expand?.maquina.maquina}</option>)}
          </select>
          <button type='submit'>ok</button>
          {dataToPdf.date && dataToPdf.maquina &&
            <ParadasButton date={dataToPdf.date} maquina={dataToPdf.maquina} />}
        </form>
      </div>

    </div>}
    {selectedFilter === 'prod' && <div className='w-full paradarel flex justify-center items-center'>
      <div
        className='customborder' >

        <form
          className=' flex flex-col'
          onSubmit={(e) => {
            e.preventDefault()
            const dt = new FormData(e.target as HTMLFormElement)
            setdataToPdf({ date: dt.get('data') as string || '', maquina: dt.get('maquina') as string || '' })
          }
          }>
          <h1>EXECUÇÕES</h1>
          <input type="date" name={'data'} />
          <select name={'maquina'}>
            {data.map((e) => <option value={e.expand?.maquina.id}>{e.expand?.maquina.maquina}</option>)}
          </select>
          <button type='submit'>ok</button>
          {dataToPdf.date && dataToPdf.maquina &&
            <ProdButton date={dataToPdf.date} maquina={dataToPdf.maquina} />}
        </form>
      </div>

    </div>}
  </div>
}
