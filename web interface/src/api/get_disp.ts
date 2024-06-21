import { pocketBaseClient } from "../util/pocketbase";

export async function getDisp(maq: string) {
  const now = new Date();
  now.setHours(now.getHours() - 2)
  const thistime = now.getFullYear() + '-' +
    (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
    now.getDate().toString().padStart(2, '0') + ' ' +
    now.getHours() + ':' +
    now.getMinutes() + ':' +
    now.getSeconds()
  const running = await pocketBaseClient.collection('registro_producao').getFullList({
    filter: 'created >= "' + thistime
      + '" && fim != "" && maquina ="' + maq + '"',
    perPage: 100000
  })

  return (running.reduce((acc, curr) =>
    acc += new Date(curr?.fim).getTime() - new Date(curr?.created).getTime()
    , 0) / 1000) / (180 * 60) * 100
}
