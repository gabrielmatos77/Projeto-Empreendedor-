import { pocketBaseClient } from "../util/pocketbase";

export async function RealizarManut(id: string, maq: string) {
  const now = new Date();
  const thistime = now.getFullYear() + '-' +
    (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
    now.getDate().toString().padStart(2, '0') + ' ' +
    now.getHours() + ':' +
    now.getMinutes() + ':' +
    now.getSeconds()
  const data = {
    "maquina": maq,
    "ultima_manutencao": thistime,
  };

  return await pocketBaseClient.collection('maquinas').update(id, data);
}
